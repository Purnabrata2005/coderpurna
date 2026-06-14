import React from 'react'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">SKILLS</h2>
      <div className="skills-grid-modern">
        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fab fa-react skill-icon-large"></i>
            <h3 className="skill-box-title">Frontend</h3>
          </div>
          <div className="tech-tags">
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="tag react">
              <i className="devicon-react-original"></i> React.js
            </a>
            <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" className="tag reactrouter">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><path d="M24 0a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm0 3.6a20.4 20.4 0 0 1 20.4 20.4 20.4 20.4 0 0 1-20.4 20.4 20.4 20.4 0 0 1-20.4-20.4 20.4 20.4 0 0 1 20.4-20.4zm0 5.4a15 15 0 0 0-15 15 15 15 0 0 0 15 15 15 15 0 0 0 15-15 15 15 0 0 0-15-15zm0 3.3a11.7 11.7 0 0 1 11.7 11.7 11.7 11.7 0 0 1-11.7 11.7 11.7 11.7 0 0 1-11.7-11.7 11.7 11.7 0 0 1 11.7-11.7zm0 2.4a9.3 9.3 0 0 0-9.3 9.3 9.3 9.3 0 0 0 9.3 9.3 9.3 9.3 0 0 0 9.3-9.3 9.3 9.3 0 0 0-9.3-9.3z"/></svg> React Router
            </a>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="tag vitejs">
              <i className="devicon-vitejs-plain"></i> Vite
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="tag nextjs">
              <i className="devicon-nextjs-plain"></i> Next.js
            </a>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="tag tailwind">
              <i className="devicon-tailwindcss-plain"></i> Tailwind CSS
            </a>
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="tag shadcn">
              <svg viewBox="0 0 256 256" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><line x1="208" y1="128" x2="128" y2="208"></line><line x1="192" y1="40" x2="40" y2="192"></line></svg> shadcn/ui
            </a>
            <a href="https://mui.com" target="_blank" rel="noopener noreferrer" className="tag materialui">
              <i className="devicon-materialui-plain"></i> Material-UI
            </a>
            <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" className="tag motion">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><path d="M12 0L24 12H12V0zM0 12L12 24V12H0z"/></svg> Motion
            </a>
            <a href="https://reactnative.dev" target="_blank" rel="noopener noreferrer" className="tag react">
              <i className="devicon-react-original"></i> React Native
            </a>
            <a href="https://redux.js.org" target="_blank" rel="noopener noreferrer" className="tag redux">
              <i className="devicon-redux-original"></i> Redux
            </a>
            <a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="noopener noreferrer" className="tag zustand">
              <i className="devicon-zustand-plain"></i> Zustand
            </a>
            <a href="https://tanstack.com/query" target="_blank" rel="noopener noreferrer" className="tag reactquery">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><path d="M6.9297 13.6875c.164-.0938.375-.0352.4687.1328l.0625.1055c.4805.8515.9805 1.6601 1.5 2.4258.6133.9023 1.3047 1.8164 2.0743 2.7421a.3455.3455 0 0 1-.0391.4844l-.0742.0664c-2.543 2.2227-4.1914 2.664-4.9532 1.332-.746-1.3046-.4765-3.6718.8086-7.1093a.3437.3437 0 0 1 .1524-.1797ZM17.75 16.3008c.1836-.0313.3594.086.3945.2695l.0196.1016c.6289 3.2851.1875 4.9297-1.3243 4.9297-1.4804 0-3.3593-1.4024-5.6484-4.2032a.3271.3271 0 0 1-.0742-.2226c0-.1875.1562-.3399.3437-.3399h.1211a32.9838 32.9838 0 0 0 2.8086-.0976c1.0703-.086 2.1914-.2305 3.3594-.4375zm.871-6.9766a.3528.3528 0 0 1 .4454-.211l.1016.0352c3.2617 1.1094 4.5039 2.332 3.7187 3.6641-.7656 1.3047-2.9922 2.254-6.6836 2.8477-.082.0117-.168-.004-.2383-.047-.168-.0976-.2265-.3085-.125-.4765l.0625-.1054c.504-.8438.957-1.6836 1.3672-2.5235.4766-.9883.9297-2.0508 1.3516-3.1836zM7.797 8.3398c.082-.0117.168.004.2383.047.168.0976.2265.3085.125.4765l-.0625.1054a34.0882 34.0882 0 0 0-1.3672 2.5235c-.4766.9883-.9297 2.0508-1.3516 3.1836a.3528.3528 0 0 1-.4453.211l-.1016-.0352c-3.2617-1.1094-4.5039-2.332-3.7187-3.6641.7656-1.3047 2.9922-2.254 6.6836-2.8477Zm5.2812-3.9843c2.543-2.2227 4.1914-2.664 4.9532-1.332.746 1.3046.4765 3.6718-.8086 7.1093a.3436.3436 0 0 1-.1524.1797c-.164.0938-.375.0352-.4687-.1328l-.0625-.1055c-.4805-.8515-.9805-1.6601-1.5-2.4258-.6133-.9023-1.3047-1.8164-2.0743-2.7421a.3455.3455 0 0 1 .0391-.4844Zm-5.793-2.082c1.4805 0 3.3633 1.4023 5.6485 4.203a.3488.3488 0 0 1 .0781.2188c-.0039.1914-.1562.3438-.3476.3438l-.1172-.004a34.5835 34.5835 0 0 0-2.8086.1016c-1.0742.086-2.1953.2305-3.3633.4375a.343.343 0 0 1-.3945-.2734l-.0196-.0977c-.629-3.2851-.1876-4.9297 1.3242-4.9297Zm2.8711 5.8124h3.6875a.638.638 0 0 1 .5508.3164l1.8477 3.2188a.6437.6437 0 0 1 0 .6289l-1.8477 3.2227a.638.638 0 0 1-.5507.3164h-3.6875c-.2266 0-.4375-.1211-.547-.3164L7.7579 12.25a.6437.6437 0 0 1 0-.629l1.8516-3.2187c.1093-.1953.3203-.3164.5468-.3164Zm3.2305.793a.638.638 0 0 1 .5508.3164l1.3906 2.4258a.6437.6437 0 0 1 0 .6289l-1.3906 2.4297a.638.638 0 0 1-.5508.3164h-2.7734c-.2266 0-.4375-.1211-.5469-.3164L8.672 12.25a.6437.6437 0 0 1 0-.629l1.3945-2.4257c.1094-.1953.3203-.3164.5469-.3164Zm-.4922.8672h-1.789c-.2266 0-.4336.1172-.547.3164l-.8983 1.5586a.6437.6437 0 0 0 0 .6289l.8984 1.5625a.6317.6317 0 0 0 .5469.3164h1.789a.6317.6317 0 0 0 .547-.3164l.8983-1.5625a.6437.6437 0 0 0 0-.629l-.8984-1.5585c-.1133-.1992-.3203-.3164-.5469-.3164Zm-.4765.8281c.2265 0 .4375.1211.5468.3164l.422.7305c.1132.1953.1132.4375 0 .6289l-.422.7344c-.1093.1953-.3203.3164-.5468.3164h-.836a.6317.6317 0 0 1-.5468-.3164l-.422-.7344c-.1132-.1914-.1132-.4336 0-.629l.422-.7304a.6317.6317 0 0 1 .5468-.3164zm-.418.8164a.548.548 0 0 0-.4727.2735c-.0976.168-.0976.375 0 .5468a.5444.5444 0 0 0 .4727.2696.5444.5444 0 0 0 .4727-.2696c.0976-.1718.0976-.3789 0-.5468A.548.548 0 0 0 12 11.3906Zm-4.4219.5469h.9805M18.9805 7.75c.3906-1.8945.4765-3.3438.2226-4.3984-.1484-.629-.4218-1.1368-.8398-1.5078-.4414-.3907-1-.582-1.625-.582-1.0352 0-2.1211.4726-3.2813 1.3671-.4726.3633-.9648.8047-1.4726 1.3164-.043-.0508-.086-.1015-.1367-.1445-1.4454-1.2852-2.6602-2.082-3.6993-2.3906-.6171-.1836-1.1953-.1993-1.7226-.0235-.5586.1875-1.004.5742-1.3164 1.1172-.5156.8945-.6524 2.0742-.461 3.5274.0782.5898.2149 1.2343.4024 1.9335a1.1187 1.1187 0 0 0-.2149.047C3.008 8.621 1.711 9.2694.9258 10.0155c-.4649.4414-.7695.9375-.8828 1.4805-.1133.5781 0 1.1562.3125 1.6992.5156.8945 1.4648 1.5977 2.8164 2.1563.543.2226 1.1562.4257 1.8437.6093a1.0227 1.0227 0 0 0-.0703.2266c-.3906 1.8906-.4765 3.3438-.2226 4.3945.1484.629.4257 1.1407.8398 1.5078.4414.3907 1 .582 1.625.582 1.0352 0 2.121-.4726 3.2813-1.3632.4765-.3711.9726-.8164 1.4882-1.336a1.2 1.2 0 0 0 .1953.2266c1.4454 1.2852 2.6602 2.082 3.6993 2.3906.6172.1836 1.1953.1993 1.7226.0235.5586-.1875 1.004-.5742 1.3164-1.1172.5157-.8945.6524-2.0742.461-3.5273-.082-.6133-.2227-1.2813-.4258-2.0118a1.2248 1.2248 0 0 0 .2383-.0468c1.828-.6094 3.125-1.2578 3.9101-2.004.4649-.4413.7696-.9374.8828-1.4804.1133-.5781 0-1.1563-.3125-1.6992-.5156-.8946-1.4648-1.5977-2.8164-2.1563-.5586-.2304-1.1953-.4414-1.9062-.625a.8647.8647 0 0 0 .0586-.1953z"/></svg> React Query
            </a>
          </div>
        </div>

        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fas fa-code skill-icon-large"></i>
            <h3 className="skill-box-title">Languages</h3>
          </div>
          <div className="tech-tags">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="tag js">
              <i className="devicon-javascript-plain"></i> JavaScript
            </a>
            <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="tag ts">
              <i className="devicon-typescript-plain"></i> TypeScript
            </a>
            <a href="https://www.java.com" target="_blank" rel="noopener noreferrer" className="tag java">
              <i className="devicon-java-plain"></i> Java
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="tag html">
              <i className="devicon-html5-plain"></i> HTML
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="tag css">
              <i className="devicon-css3-plain"></i> CSS
            </a>
          </div>
        </div>

        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fab fa-node skill-icon-large"></i>
            <h3 className="skill-box-title">Backend</h3>
          </div>
          <div className="tech-tags">
            <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="tag node">
              <i className="devicon-nodejs-plain"></i> Node.js
            </a>
            <a href="https://expressjs.com" target="_blank" rel="noopener noreferrer" className="tag express">
              <i className="devicon-express-original"></i> Express.js
            </a>
            <a href="https://orm.drizzle.team" target="_blank" rel="noopener noreferrer" className="tag drizzle">
              <svg viewBox="0 0 160 160" width="20" height="20" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><rect width="9.631" height="40.852" fill="currentColor" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 43.48 67.304)"/><rect width="9.631" height="40.852" fill="currentColor" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 76.94 46.534)"/><rect width="9.631" height="40.852" fill="currentColor" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 128.424 46.535)"/><rect width="9.631" height="40.852" fill="currentColor" rx="4.816" transform="matrix(.87303 .48767 -.49721 .86763 94.957 67.304)"/></svg> Drizzle ORM
            </a>
            <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer" className="tag prisma">
              <svg viewBox="0 0 100 100" width="20" height="20" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><path fillRule="evenodd" d="M9.774 68.639a4.98 4.98 0 0 1-.04-5.269L47.126 2.377c2.08-3.393 7.102-3.096 8.768.518l34.159 74.099a4.98 4.98 0 0 1-3.092 6.854L33.824 99.79a4.98 4.98 0 0 1-5.637-2.103zM51.44 20.211c.36-1.794 2.819-2.053 3.545-.373L78.548 74.36a1.868 1.868 0 0 1-1.18 2.53L40.653 87.85a1.867 1.867 0 0 1-2.365-2.158z" clipRule="evenodd"/></svg> Prisma
            </a>
            <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="tag firebase">
              <i className="devicon-firebase-plain"></i> Firebase
            </a>
            <a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener noreferrer" className="tag aws">
              <i className="devicon-amazonwebservices-plain-wordmark"></i> AWS S3
            </a>
          </div>
        </div>

        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fas fa-cloud skill-icon-large"></i>
            <h3 className="skill-box-title">Cloud & DevOps</h3>
          </div>
          <div className="tech-tags">
            <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="tag aws">
              <i className="devicon-amazonwebservices-plain"></i> AWS
            </a>
            <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer" className="tag docker">
              <i className="devicon-docker-plain"></i> Docker
            </a>
            <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="tag cloudinary">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><path d="M24 14.8598c0 2.1729-1.3757 3.974-3.5903 4.6996l-.0995.0318V17.989c1.3777-.5805 2.1869-1.7275 2.1869-3.1291-.0072-2-1.6087-3.6288-3.6082-3.6699h-.5964l-.1432-.5686c-.7025-2.8996-3.2886-4.9489-6.2721-4.97a6.3915 6.3915 0 0 0-5.811 3.664l-.1828.3757-.4175.0437a4.4311 4.4311 0 0 0-3.3052 2.088c-1.2803 2.0856-.6274 4.8143 1.4583 6.0947v1.6897h-.01l-.149-.0675a5.9402 5.9402 0 0 1-3.3658-4.3494c-.5787-3.2291 1.57-6.3161 4.7991-6.8948a7.8766 7.8766 0 0 1 6.9839-4.149c3.4724.025 6.535 2.28 7.5901 5.5883 2.5789.3366 4.5138 2.5245 4.5327 5.1251zm-15.3176-1.322h.5647a.0656.0656 0 0 0 .0457-.1113L7.084 11.2158l-.0007-.0007a.0656.0656 0 0 0-.0927.0007L4.78 13.4265a.0656.0656 0 0 0 .0477.1113h.5566a.0656.0656 0 0 1 .0657.0656v5.0574c0 .6588.534 1.1928 1.1928 1.1928H9.247a.0656.0656 0 0 0 .0457-.1113l-.33-.33a1.1928 1.1928 0 0 1-.348-.839v-4.97a.0676.0676 0 0 1 .0676-.0655zm9.769 2.5466h.5667a.0655.0655 0 0 0 .0457-.1133l-2.2107-2.2087-.0015-.0015a.0636.0636 0 0 0-.0899.0015L14.551 15.971a.0657.0657 0 0 0 .0457.1133h.5567a.0656.0656 0 0 1 .0656.0656v2.5108c0 .6588.534 1.1928 1.1928 1.1928h2.6063a.0655.0655 0 0 0 .0457-.1113l-.33-.33a1.1928 1.1928 0 0 1-.348-.839V16.15a.0656.0656 0 0 1 .0657-.0656zm-4.8844-1.2743h.5646a.0656.0656 0 0 0 .0477-.1114l-2.2107-2.2027-.0006-.0006a.0656.0656 0 0 0-.0928.0006l-2.2087 2.2068a.0656.0656 0 0 0 .0457.1113h.5626a.0676.0676 0 0 1 .0657.0676v3.7791c0 .6588.534 1.1928 1.1928 1.1928h2.5983a.0656.0656 0 0 0 .0477-.1113l-.332-.33a1.193 1.193 0 0 1-.346-.839v-3.6956c0-.0366.0291-.0665.0657-.0676z"/></svg> Cloudinary
            </a>
          </div>
        </div>

        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fas fa-database skill-icon-large"></i>
            <h3 className="skill-box-title">Databases</h3>
          </div>
          <div className="tech-tags">
            <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer" className="tag mongodb">
              <i className="devicon-mongodb-plain"></i> MongoDB
            </a>
            <a href="https://redis.io" target="_blank" rel="noopener noreferrer" className="tag redis">
              <i className="devicon-redis-plain"></i> Redis
            </a>
            <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer" className="tag postgresql">
              <i className="devicon-postgresql-plain"></i> PostgreSQL
            </a>
          </div>
        </div>

        <div className="skill-box">
          <div className="skill-box-header">
            <i className="fas fa-tools skill-icon-large"></i>
            <h3 className="skill-box-title">Tools & More</h3>
          </div>
          <div className="tech-tags">
            <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="tag git">
              <i className="devicon-git-plain"></i> Git
            </a>
            <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="tag vscode">
              <i className="devicon-vscode-plain"></i> VSCode
            </a>
            <a href="https://www.postman.com" target="_blank" rel="noopener noreferrer" className="tag postman">
              <i className="devicon-postman-plain"></i> Postman
            </a>
            <a href="https://requestly.com" target="_blank" rel="noopener noreferrer" className="tag requestly">
              <svg viewBox="0 0 512 511.9" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', width: '1.2rem', height: '1.2rem' }}><linearGradient id="req-a" x1="-2.143" x2="301.21" y1="507.12" y2="-160.366" gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ea0ff"/><stop offset="1" stopColor="#004eeb"/></linearGradient><path d="M254.5 502.3V384.1c-40.8.6-85.3-2.7-131.6-12.1l-.2-.2v70.4c0 14.1 1.5 25.4 4.5 34.1s7.3 15.4 12.9 20.3c6.1 4.9 13.4 8.1 22 9.7 9.1 2.2 19.4 3.2 31.1 3.2q17.4 0 34.8-2.4c12.1-1.6 20.9-3.2 26.5-4.8" fill="url(#req-a)"/><linearGradient id="req-b" x1="130.478" x2="433.832" y1="567.393" y2="-100.093" gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ea0ff"/><stop offset="1" stopColor="#004eeb"/></linearGradient><path d="M254.5 346.5h5.6c51.8-1 108.3-8.7 156.5-30.8v-.1q33.3-19.5 57.6-55.2c16.2-23.8 24.2-52.5 24.2-86 0-53.6-17.7-96-53-127.4C410 15.7 357.5 0 287.8 0c-25.8 0-50 1.6-72.7 4.9-22.7 2.7-42.7 7.3-59.8 13.8-10.1 3.8-18.2 8.9-24.2 15.4-5.6 6-8.3 14.6-8.3 26v136.1c23.2 3.6 111.3 11.2 131 10.3v-89.6c5.6-1.1 10.6-1.9 15.1-2.4s10.6-.8 18.2-.8c26.8 0 46.2 5.4 58.3 16.2q18.9 15.45 18.9 46.2c0 30.75-5.6 36.2-16.7 47.1-11.1 10.3-26.3 15.4-45.4 15.4h-48.5v-.4c-.1.2-.3.4-.4.6-73.5-3.5-118.1-6.7-130.7-8.4l-34.9-3.5c-3.2-.3-5.5-3.2-5.2-6.3l1.9-19.2c.5-5.6-6.3-8.6-10.1-4.5L1.5 277c-2 2.2-2 5.5 0 7.8L60 350.4c3.4 3.8 9.6 1.7 10.1-3.3l1.4-13.8c.3-3.4 3.4-5.7 6.7-5.1l44.5 7.7v.3l.2-.2c27.2 4.5 76.4 11.2 131.6 10.5" fill="url(#req-b)"/><linearGradient id="req-c" x1="187.216" x2="490.57" y1="593.179" y2="-74.308" gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ea0ff"/><stop offset="1" stopColor="#004eeb"/></linearGradient><path d="m358.2 456-43.9-75.6c57-6.2 102.1-18.9 127.3-29.1 9.7 13.4 19.2 26.4 28.7 38.9q26.55 34.95 41.7 63.3c-5 18.9-14.4 33.5-28 43.8-13.1 9.7-28 14.6-44.7 14.6-11.1 0-20.7-1.4-28.8-4.1s-15.1-6.5-21.2-11.4-11.6-10.8-16.7-17.9-9.8-14.4-14.4-22.5" fill="url(#req-c)"/><linearGradient id="req-d" x1="363.964" x2="151.072" y1="135.778" y2="191.362" gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ea0ff"/><stop offset="1" stopColor="#004eeb"/></linearGradient><path d="M0 281c0 1.3.5 2.7 1.5 3.7L60 350.4c3.4 3.8 9.6 1.7 10.1-3.3l1.4-13.8c.3-3.4 3.4-5.7 6.7-5.1l44.5 7.7v.3l.2-.2c27.2 4.6 76.4 11.3 131.6 10.7v-.1h1.1v-51.1z" fill="url(#req-d)"/><linearGradient id="req-e" x1="71.975" x2="460.155" y1="270.89" y2="221.231" gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ea0ff"/><stop offset="1" stopColor="#004eeb"/></linearGradient><path d="M255.6 295.4 0 281c0-1.4.5-2.9 1.5-4l72.9-80.2c3.8-4.1 10.6-1.1 10.1 4.5l-1.9 19.2c-.3 3.2 2 6 5.2 6.3l34.9 3.5c12.6 1.8 57.2 4.9 130.7 8.4.1-.2.2-.4.4-.6v.4h1.9v56.9z" fill="url(#req-e)"/></svg> Requestly
            </a>
            <a href="https://pnpm.io" target="_blank" rel="noopener noreferrer" className="tag pnpm">
              <i className="devicon-pnpm-plain"></i> pnpm
            </a>
            <a href="https://bun.sh" target="_blank" rel="noopener noreferrer" className="tag bun">
              <i className="devicon-bun-plain"></i> Bun
            </a>
          </div>
        </div>

        {/* <div className="skill-box highlight-box">
          <div className="skill-box-header">
            <i className="fas fa-sitemap skill-icon-large"></i>
            <h3 className="skill-box-title">Architecture</h3>
          </div>
          <div className="tech-tags">
            <a href="https://microservices.io" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-cubes"></i> Microservices
            </a>
            <a href="https://en.wikipedia.org/wiki/Software_as_a_service" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-cloud"></i> SaaS
            </a>
            <a href="https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-exchange-alt"></i> Pub/Sub
            </a>
            <a href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-route"></i> Routing Slip
            </a>
            <a href="https://en.wikipedia.org/wiki/Dead_letter_queue" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-inbox"></i> Dead Letter Queues
            </a>
          </div>
        </div>

        <div className="skill-box highlight-box">
          <div className="skill-box-header">
            <i className="fas fa-users-cog skill-icon-large"></i>
            <h3 className="skill-box-title">Methodologies</h3>
          </div>
          <div className="tech-tags">
            <a href="https://en.wikipedia.org/wiki/Agile_software_development" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-sync-alt"></i> Agile
            </a>
            <a href="https://www.scrum.org" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-users"></i> Scrum
            </a>
            <a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-code-branch"></i> CI/CD
            </a>
            <a href="https://en.wikipedia.org/wiki/Test-driven_development" target="_blank" rel="noopener noreferrer" className="tag">
              <i className="fas fa-vial"></i> TDD
            </a>
          </div>
        </div> */}
      </div>
    </section>
  )
}
