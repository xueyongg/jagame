import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{"body { margin: 0 } /* custom! */"}</style>
          <meta
            content="initial-scale=1.0, width=device-width, maximum-scale=1"
            key="viewport"
            name="viewport"
          />
          <link
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jaga­me.com/logos/v2/logo.square.pink.png"
            rel="shortcut icon"
          />
        </Head>

        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
