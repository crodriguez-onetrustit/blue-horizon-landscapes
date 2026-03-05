import Script from 'next/script'

export default function GA4() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N1E4VKZQ1E"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N1E4VKZQ1E');
        `}
      </Script>
    </>
  )
}
