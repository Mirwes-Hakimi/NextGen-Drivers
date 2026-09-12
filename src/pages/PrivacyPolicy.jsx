import infoStyles from "../styles/InfoPage.module.css";
import styles from "../styles/PrivacyPolicy.module.css";

// Privacy Policy — shown at /privacy-policy
export default function PrivacyPolicy() {
  return (
    <div className={infoStyles.page}>

      {/* ── Hero ── */}
      <section className={infoStyles.hero}>
        <p className={infoStyles.heroEyebrow}>Legal</p>
        <h1 className={infoStyles.heroHeading}>
          Privacy <span>Policy</span>
        </h1>
        <p className={infoStyles.heroSub}>Last Updated: September 12, 2026</p>
      </section>

      {/* ── Content ── */}
      <div className={infoStyles.content}>
        <p className={styles.text}>
          Best Driving School (“Best Driving School,” “we,” “us,” or “our”) respects your
          privacy and is committed to protecting the personal information you provide to us.
        </p>
        <p className={styles.text}>
          This Privacy Policy explains how we collect, use, maintain, and protect personal
          information when you visit our website, schedule or receive our services, contact
          us, or otherwise interact with Best Driving School.
        </p>

        <h2 className={infoStyles.sectionHeading}>1. Information We Collect</h2>
        <p className={styles.text}>
          We collect information that is reasonably necessary to provide our services and
          operate our driving school.
        </p>
        <p className={styles.text}>
          Depending on how you interact with us, the information we may collect includes:
        </p>
        <ul className={styles.list}>
          <li>Full name;</li>
          <li>Email address;</li>
          <li>Telephone or mobile phone number;</li>
          <li>Residential or mailing address;</li>
          <li>Date of birth;</li>
          <li>Driver's permit or driver's license information when necessary to provide our services;</li>
          <li>Appointment and scheduling information;</li>
          <li>Driving lesson and service records;</li>
          <li>DMV test rental information;</li>
          <li>Payment and billing information;</li>
          <li>Information contained in communications you send to us; and</li>
          <li>Other information you voluntarily provide when requesting or using our services.</li>
        </ul>
        <p className={styles.text}>
          We may also automatically receive limited technical information when you visit our
          website, such as your IP address, browser type, device information, pages visited,
          and general information about how you interact with our website.
        </p>

        <h2 className={infoStyles.sectionHeading}>2. How We Use Your Information</h2>
        <p className={styles.text}>
          Best Driving School uses personal information for legitimate business and
          service-related purposes, including to:
        </p>
        <ul className={styles.list}>
          <li>Schedule and manage driving lessons;</li>
          <li>Confirm, reschedule, or cancel appointments;</li>
          <li>Assign and coordinate instructors;</li>
          <li>Coordinate student pick-up and drop-off arrangements;</li>
          <li>Send appointment confirmations and reminders;</li>
          <li>Send instructor arrival or scheduling notifications;</li>
          <li>Provide DMV test rental services and related information;</li>
          <li>Process payments, invoices, refunds, and billing matters;</li>
          <li>Respond to questions and customer-service requests;</li>
          <li>Maintain accurate student, customer, and business records;</li>
          <li>Operate, maintain, and improve our website and services;</li>
          <li>Protect our systems, services, customers, and business from fraud, misuse, or unauthorized activity; and</li>
          <li>Comply with applicable laws, regulations, legal processes, and lawful requests.</li>
        </ul>
        <p className={styles.text}>
          We use personal information only for purposes reasonably related to our business,
          the services we provide, or other purposes permitted by law.
        </p>

        <h2 className={infoStyles.sectionHeading}>3. How We Collect Information</h2>
        <p className={styles.text}>We may collect personal information directly from you when you:</p>
        <ul className={styles.list}>
          <li>Schedule a driving lesson;</li>
          <li>Complete a form on our website;</li>
          <li>Contact us by phone, email, or text message;</li>
          <li>Make a payment;</li>
          <li>Request information or customer support; or</li>
          <li>Otherwise provide information to us in connection with our services.</li>
        </ul>
        <p className={styles.text}>
          When a parent or legal guardian schedules services for a student, we may receive
          information about the student from that parent or guardian.
        </p>
        <p className={styles.text}>
          We may also receive information through third-party systems that help us provide
          scheduling, payment, communication, website, or other business services.
        </p>

        <h2 className={infoStyles.sectionHeading}>4. Text Messages and Telephone Communications</h2>
        <p className={styles.text}>
          When you provide a telephone or mobile number to Best Driving School, we may use it
          to communicate with you regarding your appointments, services, and requests.
        </p>
        <p className={styles.text}>Text messages may include:</p>
        <ul className={styles.list}>
          <li>Appointment confirmations;</li>
          <li>Appointment reminders;</li>
          <li>Scheduling or rescheduling information;</li>
          <li>Instructor arrival notifications;</li>
          <li>DMV test rental information;</li>
          <li>Billing or payment notifications; and</li>
          <li>Responses to customer-service inquiries.</li>
        </ul>
        <p className={styles.text}>
          These are service-related communications and are not used by Best Driving School
          for marketing or promotional text-message campaigns.
        </p>
        <p className={styles.text}>
          Message and data rates may apply. Message frequency may vary depending on your
          appointments and communications with us.
        </p>
        <h3 className={styles.subHeading}>Mobile Information Privacy</h3>
        <p className={styles.text}>
          Best Driving School does not sell or rent mobile telephone numbers or text-message
          information to third parties for their own marketing or promotional purposes.
        </p>
        <p className={styles.text}>
          Mobile numbers and text-message information may be provided to service providers
          when reasonably necessary to deliver communications, manage appointments, process
          transactions, or provide other services on behalf of Best Driving School.
        </p>

        <h2 className={infoStyles.sectionHeading}>5. Sharing of Personal Information</h2>
        <p className={styles.text}>Best Driving School does not sell personal information as a source of revenue.</p>
        <p className={styles.text}>
          We may share personal information with trusted service providers when reasonably
          necessary to operate our business or provide services to you. These providers may
          assist with:
        </p>
        <ul className={styles.list}>
          <li>Website operation and hosting;</li>
          <li>Appointment scheduling;</li>
          <li>Payment processing;</li>
          <li>Customer communications;</li>
          <li>Accounting and billing;</li>
          <li>Technology and security; and</li>
          <li>Other administrative or operational functions.</li>
        </ul>
        <p className={styles.text}>We may also disclose personal information when:</p>
        <ul className={styles.list}>
          <li>You request or authorize us to do so;</li>
          <li>It is necessary to provide a service you have requested;</li>
          <li>Disclosure is required by law or legal process;</li>
          <li>Disclosure is necessary to protect the safety, rights, property, or security of Best Driving School, our customers, or others; or</li>
          <li>Otherwise permitted by applicable law.</li>
        </ul>
        <p className={styles.text}>
          We expect service providers that receive personal information from us to use that
          information only for the purposes for which it was provided or as otherwise
          permitted by law.
        </p>

        <h2 className={infoStyles.sectionHeading}>6. Payment Information</h2>
        <p className={styles.text}>Payments may be processed through third-party payment processors.</p>
        <p className={styles.text}>
          When payment information is processed through a third-party payment provider, Best
          Driving School does not intentionally store complete credit or debit card numbers
          or card security codes on its own systems.
        </p>
        <p className={styles.text}>
          Third-party payment providers may collect and process payment information according
          to their own privacy policies and terms.
        </p>

        <h2 className={infoStyles.sectionHeading}>7. Cookies and Website Technologies</h2>
        <p className={styles.text}>
          Our website may use cookies and similar technologies to help the website function,
          remember preferences, understand website traffic, and improve website performance
          and user experience.
        </p>
        <p className={styles.text}>
          You may be able to control or disable cookies through your browser settings.
          Certain website features may not function properly if cookies are disabled.
        </p>

        <h2 className={infoStyles.sectionHeading}>8. Third-Party Websites and Services</h2>
        <p className={styles.text}>
          Our website may contain links to or integrate with third-party websites,
          applications, scheduling platforms, payment services, or other systems.
        </p>
        <p className={styles.text}>
          Third-party services operate independently from Best Driving School and may have
          their own privacy policies and terms.
        </p>
        <p className={styles.text}>
          We are not responsible for the privacy practices, security, or content of
          third-party services. We encourage you to review their applicable privacy policies
          before providing information directly to those services.
        </p>

        <h2 className={infoStyles.sectionHeading}>9. Protection of Personal Information</h2>
        <p className={styles.text}>
          Best Driving School maintains reasonable administrative, technical, and
          organizational safeguards designed to protect personal information against
          unauthorized access, use, alteration, or disclosure.
        </p>
        <p className={styles.text}>
          However, no method of electronic storage or transmission over the internet is
          completely secure. While we take reasonable measures to protect personal
          information, we cannot guarantee absolute security.
        </p>

        <h2 className={infoStyles.sectionHeading}>10. Retention of Personal Information</h2>
        <p className={styles.text}>
          We retain personal information for as long as reasonably necessary to provide our
          services, maintain appropriate business and financial records, resolve disputes,
          enforce agreements, protect our business, and comply with applicable legal or
          regulatory requirements.
        </p>
        <p className={styles.text}>
          When personal information is no longer reasonably necessary for these purposes, we
          may delete or securely dispose of it, subject to applicable record-retention
          requirements.
        </p>

        <h2 className={infoStyles.sectionHeading}>11. Student and Minor Privacy</h2>
        <p className={styles.text}>Our driving services may be provided to students under the age of 18.</p>
        <p className={styles.text}>
          When a parent or legal guardian provides information on behalf of a student, we use
          that information to administer the student's services, maintain appropriate
          records, communicate regarding appointments, and provide the requested driving
          instruction or related services.
        </p>
        <p className={styles.text}>Best Driving School does not sell personal information belonging to minors.</p>

        <h2 className={infoStyles.sectionHeading}>12. California Privacy Rights</h2>
        <p className={styles.text}>Best Driving School respects privacy rights provided by applicable California law.</p>
        <p className={styles.text}>
          Depending on the circumstances and whether a particular law applies to our
          business, California residents may have certain rights concerning their personal
          information, including the right to:
        </p>
        <ul className={styles.list}>
          <li>Request information about the categories of personal information collected and how it is used;</li>
          <li>Request access to certain personal information we maintain;</li>
          <li>Request correction of inaccurate personal information;</li>
          <li>Request deletion of personal information, subject to applicable legal exceptions; and</li>
          <li>Exercise other privacy rights provided by applicable California law.</li>
        </ul>
        <p className={styles.text}>Certain rights may be limited or subject to exceptions under applicable law.</p>
        <p className={styles.text}>
          Best Driving School will not unlawfully discriminate against an individual for
          exercising a privacy right available to them under applicable law.
        </p>

        <h2 className={infoStyles.sectionHeading}>13. Privacy Requests</h2>
        <p className={styles.text}>
          If you have a question about our privacy practices or would like to submit a
          privacy-related request, you may contact Best Driving School through the contact
          information provided on our website.
        </p>
        <p className={styles.text}>
          We may take reasonable steps to verify the identity of the person making a request
          before providing certain information or completing certain requests.
        </p>
        <p className={styles.text}>We will handle valid privacy requests in accordance with applicable law.</p>

        <h2 className={infoStyles.sectionHeading}>14. Changes to This Privacy Policy</h2>
        <p className={styles.text}>
          Best Driving School may update this Privacy Policy from time to time to reflect
          changes to our services, business practices, technology, or applicable legal
          requirements.
        </p>
        <p className={styles.text}>
          When we make changes, we will update the “Last Updated” date at the top of this page.
        </p>
        <p className={styles.text}>
          We encourage you to review this Privacy Policy periodically to remain informed
          about how we handle personal information.
        </p>

        <h2 className={infoStyles.sectionHeading}>15. Contact Us</h2>
        <p className={styles.text}>
          If you have questions about this Privacy Policy or how Best Driving School handles
          personal information, please contact us through our website.
        </p>
        <p className={styles.textStrong}>Best Driving School</p>
      </div>
    </div>
  );
}
