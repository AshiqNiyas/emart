import { useNavigate } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Your payment is successful</div>
      <button onClick={() => navigate("/")}>Go home</button>
    </div>
  );
}

export default Success;
