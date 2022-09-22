import SignUp from "../components/SignUp";
import verifyToken from "../helpers/verifyToken";

export default function PageSignUp() {
  return <SignUp />;
}

export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies.token;

  if (!token) {
    return {
      props: {},
    };
  }

  const verify = await verifyToken(token);
  if (verify.error) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/app",
      permanent: false,
    },
  };
}
