useEffect(() => {
    socket.on("recived message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  useEffect(() => {
    if (userId && targetId) {
      socket.emit("join room", { userId, targetId });
    }
  }, [userId, targetId]);

  const handleMessage = () => {
    if (input.trimStart()) {
      const targetId = "6867d14773c3c0b10331d8c6";
      socket.emit("join room", { userId, targetId });
      socket.emit("chat message", {
        userId,
        targetId,
        msg: input,
      });
      setInput("");
    }
  };