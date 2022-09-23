import App from "../components/App";
import Layout from "../components/Layout";
import verifyToken from "../helpers/verifyToken";

export default function PageApp(props) {
  return (
    <Layout>
      <App {...props} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies.token;
  const user = ctx.req.cookies.user;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const verify = await verifyToken(token);
  if (verify.error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
