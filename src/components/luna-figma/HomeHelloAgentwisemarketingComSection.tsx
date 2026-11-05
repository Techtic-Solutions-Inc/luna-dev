/**
 * Luna generated layout
 * Figma node: 2270:16773
 * Section: hello@agentwisemarketing.com
 * Route: /home
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import { figmaTextContent, useFigmaPayloadVersion } from "./figmaDisplay";

export function HomeHelloAgentwisemarketingComSection() {
  useFigmaPayloadVersion();
  const privacyHref = figmaTextContent("href:privacy_policy_link", "/privacy-policy");
  const termsHref = figmaTextContent("href:terms_of_service_link", "/terms-of-service");
  return (
    <section data-figma-node="2270:16773" className="relative box-border mt-[80px] w-full min-w-0 h-[324px] min-w-[1920px] figma-fit [--fit-w:1920] block bg-text-primary z-[4]">
      <div data-figma-node="2270:16774" className="box-border w-[1920px] h-[324px] absolute left-[0px] top-[0px] block bg-text-primary"></div>
      <div data-figma-node="2270:16775" className="box-border w-max max-w-[min(499px,100%)] h-auto absolute left-[210px] top-[187px] flex flex-row items-center gap-9 max-[1919px]:flex-wrap max-[1919px]:gap-y-3">
        <a href="/about-us" data-figma-node="2270:16776" className="box-border w-max max-w-[min(61px,100%)] h-auto min-h-[25px] font-almarai text-[22px] font-[400] leading-[25px] capitalize text-left whitespace-nowrap text-success">About</a>
        <a href="/content" data-figma-node="2270:16777" className="box-border w-max max-w-[min(81px,100%)] h-auto min-h-[25px] font-almarai text-[22px] font-[400] leading-[25px] capitalize text-left whitespace-nowrap text-success">Content</a>
        <a href="/pricing" data-figma-node="2270:16778" className="box-border w-max max-w-[min(71px,100%)] h-auto min-h-[25px] font-almarai text-[22px] font-[400] leading-[25px] capitalize text-left whitespace-nowrap text-success">Pricing</a>
        <a href="/blog" data-figma-node="2270:16780" className="box-border w-max max-w-[min(48px,100%)] h-auto min-h-[25px] font-almarai text-[22px] font-[400] leading-[25px] capitalize text-left whitespace-nowrap text-success">Blog</a>
        <a href="/contact" data-figma-node="2270:16781" className="box-border w-max max-w-[min(110px,100%)] h-auto min-h-[25px] font-almarai text-[22px] font-[400] leading-[25px] capitalize text-left whitespace-nowrap text-success">Contact Us</a>
      </div>
      <img data-figma-node="2270:16782" src="/assets/figma/2270-16782.png" alt="" aria-hidden="true" width={233} height={78} decoding="async" onError={e => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} className="box-border w-[233px] h-[78px] absolute left-[210px] top-[70px] max-w-none object-cover object-top" />
      <h4 data-figma-node="2270:16895" className="box-border w-[330px] h-[27px] absolute left-[1380px] top-[186px] font-almarai text-[24px] font-[400] leading-[27px] lowercase text-right min-[1920px]:whitespace-nowrap text-success">{figmaTextContent("2270:16895", "hello@agentwisemarketing.com")}</h4>
      <img data-figma-node="2270:16896" src="/assets/figma/2270-16896.png" alt="List" width={186} height={54} decoding="async" onError={e => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} className="box-border w-[186px] h-[54px] max-[1919px]:h-auto max-[1919px]:min-h-[54px] absolute left-[1524px] top-[82px] max-w-none object-cover object-top" />
      <div data-figma-node="2270:16913" className="box-border w-[1500px] h-[1px] absolute left-[210px] top-[270px]" style={{backgroundColor: "rgba(224, 224, 224, 0.5)"}} />
      <div data-figma-node="2270:16914" className="box-border w-max max-w-[min(249px,100%)] h-auto absolute left-[1465px] top-[290px] opacity-[0.6] flex flex-row items-center gap-4">
        <a href={termsHref || "/terms-of-service"} data-figma-node="2270:16915" className="box-border w-max max-w-[min(120px,100%)] h-auto min-h-[18px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-success">Terms of Service</a>
        <div data-figma-node="2270:16916" className="box-border w-[1px] shrink-0 h-[17px] bg-warning" />
        <a href={privacyHref || "/privacy-policy"} data-figma-node="2270:16917" className="box-border w-max max-w-[min(101px,100%)] h-auto min-h-[18px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-success">Privacy Policy</a>
      </div>
      <p data-figma-node="2270:16918" className="box-border w-[269px] h-[18px] absolute left-[210px] top-[290px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left min-[1920px]:whitespace-nowrap text-success">© 2026 Agentwise. All Rights Reserved.</p>
    </section>
  );
}
