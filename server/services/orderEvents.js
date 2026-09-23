const subscribers = new Set();

const subscribe = (response, userId = null) => {
  const subscriber = { response, userId: userId ? String(userId) : null };
  subscribers.add(subscriber);
  const heartbeat = setInterval(() => response.write(': keep-alive\n\n'), 25000);
  return () => {
    clearInterval(heartbeat);
    subscribers.delete(subscriber);
  };
};

const publish = (type, order) => {
  const orderId = order?._id || order;
  const orderUserId = order?.userId?._id || order?.userId;
  const payload = `event: order-change\ndata: ${JSON.stringify({ type, orderId: String(orderId) })}\n\n`;
  subscribers.forEach(({ response, userId }) => {
    if (!userId || userId === String(orderUserId)) response.write(payload);
  });
};

module.exports = { subscribe, publish };
