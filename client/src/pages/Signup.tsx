import SignupForm from "../components/SignupForm";

function Signup(){
    return (
    <div className="signup-container">
      <h2>Sign-Up for MindFlip</h2>
      <SignupForm handleModalClose={() => {}}/>
    </div>
  );
};

export default Signup;