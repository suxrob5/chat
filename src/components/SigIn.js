const SignIn = ({ auth, firebase }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className="font-[600] text-3xl w-[300px] rounded-lg hover:bg-opacity-90 bg-blue-500 hover:shadow-xl active:shadow-2xl"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
