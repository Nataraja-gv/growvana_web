import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useSnackbar } from "notistack";
import {
  createRazorSubscription,
  createSubscription,
  getActiveSubsciption,
} from "../services/order/order";

const SubScription_PLAN_CONFIG = {
  monthlyPlan: { PlanAmount: 500, durationInDays: 30 },
  quarterlyPlan: { PlanAmount: 1250, durationInDays: 90 },
  yearPlan: { PlanAmount: 1500, durationInDays: 365 },
};

const planBenefits = [
  "Free Delivery on All Orders",
  "Exclusive Green Rewards",
  "Special Monthly Offers",
  "Priority Customer Support",
];

const SubscriptionPage = () => {
  const [userPremium, setUserPremium] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const plans = [
    {
      id: "monthlyPlan",
      name: "Monthly",
      tag: "Starter Pack",
      highlight: false,
      ...SubScription_PLAN_CONFIG.monthlyPlan,
    },
    {
      id: "quarterlyPlan",
      name: "Quarterly",
      tag: "Smart Saver",
      highlight: false,
      ...SubScription_PLAN_CONFIG.quarterlyPlan,
    },
    {
      id: "yearPlan",
      name: "Yearly",
      tag: "Best Value 💎",
      highlight: true,
      ...SubScription_PLAN_CONFIG.yearPlan,
    },
  ];

  const handleSubscribe = async (planType) => {
    try {
      // const res = await createSubscription(planType);
      const razorPayResponse = await createRazorSubscription(planType);

      if (razorPayResponse) {
        const order = razorPayResponse?.data;
        const options = {
          key: "rzp_test_AB3JXDeazzdzSW",
          amount: order.amount,
          currency: "INR",
          name: "GrowVana",
          description: "Test Transaction",
          image:
            "https://freshcartdev.s3.eu-north-1.amazonaws.com/growvana.jpg",
          order_id: order.id,
          // callback_url: "/track_order_page",
          prefill: {
            name: order.notes.name,
            email: order.notes.email,
            contact: "9999999999",
          },
          theme: {
            color: "#008000",
          },
          handler: function (order) {
            window.location.href = "/premium";
          },
          modal: {
            ondismiss: function () {
              window.location.href = "/premium";
            },
          },
        };
        const rzp = new Razorpay(options);
        rzp.open();
      }
      // if (razorPayResponse) {
      //   enqueueSnackbar("🌿 Go Premium Subscription Successfully", {
      //     variant: "success",
      //   });
      //   fetchSubscription();
      // }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const fetchSubscription = async () => {
    try {
      const res = await getActiveSubsciption();
      setUserPremium(res?.subscription);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-green-100 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-green-800 mb-2">
          🌿 Go Premium with GrowVana
        </h1>
        <p className="text-green-600 text-lg">
          Choose a subscription that fits your plant-loving lifestyle 🌱
        </p>
      </div>

      {userPremium?.planType && (
        <div className="max-w-3xl mx-auto mb-10 bg-white border border-green-300 rounded-2xl p-6 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            You're already a Premium Member 🎉
          </h2>
          <p className="text-green-700">
            Current Plan:{" "}
            <strong>{userPremium.planType.replace("Plan", "")}</strong> | Active
            till:{" "}
            <strong>
              {new Date(userPremium.endDate).toLocaleDateString()}
            </strong>
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = userPremium?.planType === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-green-300 border ${
                plan.highlight
                  ? "border-green-600 scale-105"
                  : "border-green-200"
              } transition-transform`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  {plan.tag}
                </span>
              )}
              {isCurrentPlan && (
                <span className="absolute top-12 right-5 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-400">
                  Active Plan
                </span>
              )}

              <h2 className="text-2xl font-semibold text-green-800 mb-1">
                {plan.name} Plan
              </h2>
              <p className="text-green-500 text-sm mb-4">
                {plan.durationInDays} Days Access
              </p>

              <p className="text-3xl font-bold text-green-700 mb-6">
                ₹{plan.PlanAmount}
              </p>

              <ul className="mb-6 space-y-3">
                {planBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-green-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full py-2 rounded-xl font-medium transition duration-200 ${
                  isCurrentPlan
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {isCurrentPlan ? "Already Subscribed" : "Subscribe Now"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-14 text-green-700 text-sm">
        💡 Tip: Yearly plans offer the best value and maximum rewards!
      </div>
    </div>
  );
};

export default SubscriptionPage;
