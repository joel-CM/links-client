const verifyToken = async (token) => {
  const res = await fetch(`http://localhost:3001/users/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  return data;
};

export default verifyToken;
