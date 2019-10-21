import { h, Fragment } from "preact";
import { css, cx } from "emotion";
import { Link } from "@react-router5";
import { Helmet } from "@react-helmet-async";
import { NOT_HOME_ROUTE } from "@lib/common/routes/notHome";
import { REDIRECT_ROUTE } from "@lib/common/routes/redirect";

const Home = function({ data, router }) {
  return (
    <Fragment>
      <Helmet>
        <html data-id="some id" />
        <body class="app app--home" />
        <title>{data.label}</title>

        <meta name="description" content={"the color is " + data.color} />
        <meta name="keywords" content="some-keyword" />
        <meta name="viewport" content="width=device-width" />
      </Helmet>
      <div
        class={css`
          width: 200px;
        `}
      >
        <svg viewBox="0 0 25 25">
          <use href="#rocket" />
        </svg>
      </div>
      <h1 class={`color: ${data.color};`}>{data.label}</h1>
      <button
        onClick={() => {
          router.navigate(NOT_HOME_ROUTE);
        }}
      >
        Go to notHome
      </button>
      <br />
      <Link routeName={REDIRECT_ROUTE}>Go to Search</Link>
    </Fragment>
  );
};

export default Home;
