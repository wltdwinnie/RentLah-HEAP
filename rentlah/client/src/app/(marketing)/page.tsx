"use client";
import styles from "./Home.module.css";
import { UniversityDropdown } from "@/components/quickfilters/university-filter";
import { useRouter } from "next/navigation";
import { PropertyCardGroup } from "@/components/propertycard-group";
import { fetchListings } from "@/lib/fetchListings";
import { useEffect, useState } from 'react';
import { ShieldCheck, Wallet, MapPin, Users, ChevronDown } from "lucide-react";
import { Listing } from '@/lib/definition';
import { useTheme } from 'next-themes';
import * as Accordion from '@radix-ui/react-accordion';

export default function Home() {
  const router = useRouter();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchListings({ isFeatured: true })
      .then((data) => setFeaturedListings(data))
      .catch((err) => console.error("Error fetching featured listings:", err));
  }, []);

  const handleUniversitySelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  if (!mounted) return null;

  const videoSrc =
    theme === "dark"
      ? "/assets/rentlah-nightview-sgp.mp4"
      : "/assets/cityscape-video.mp4";

  return (
    <main>
      {/* 1. Welcome Section */}
      <section>
        <div className={styles.sectionInner}>
          <div className={styles.welcomeSection}>
            <video
              className={styles.videoBg}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/sgp-landscape.jpeg"
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support this video.
            </video>

            <div className={styles.boxOverlay}>
              <h1 className={styles.title}>
                <span className={styles.blacktext}>Welcome to </span>
                <span className={styles.rentlahBold}>RentLah!</span>
              </h1>

              <p className={styles.welcdescription}>
                Looking for a place to stay while studying in Singapore? <br />
                You&apos;ve come to the right place.
              </p>
              <p className={styles.welcdescription}>
                Select your university below to get started!
              </p>

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <UniversityDropdown
                  hasHat={true}
                  className={styles.uniDropdownHome}
                  onSelect={handleUniversitySelect}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Listings */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subTitle}>Featured Listings</h2>
          </div>
          <div className={styles.homeFeaturedCardGroup}>
            <PropertyCardGroup listings={featuredListings} />
          </div>
        </div>
      </section>

      {/* 3. Why Choose RentLah */}
      <section className={`${styles.sectionLightBlue} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>
            Why Singapore Students Choose RentLah
          </h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <ShieldCheck className="h-10 w-10 text-primary" />
              <h3>
                <b>Verified Listings</b>
              </h3>
              <p>
                All properties are verified by our team to ensure safety and
                accuracy.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <Wallet className="h-10 w-10 text-primary" />
              <h3>
                <b>Student Budget Friendly</b>
              </h3>
              <p>
                Find accommodations that fit your student budget with no hidden
                fees.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <MapPin className="h-10 w-10 text-primary" />
              <h3>
                <b>Campus Proximity</b>
              </h3>
              <p>
                Properties near major universities, polytechnics and junior
                colleges.
              </p>
            </div>
            <div className={styles.benefitCard}>
              <Users className="h-10 w-10 text-primary" />
              <h3>
                <b>Student Community</b>
              </h3>
              <p>Connect with other students and find compatible roommates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>Our Students&apos; Testimonials</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <p>
                &quot;Super convenient! I found a room near NUS in just 3
                days.&quot;
              </p>
              <br />
              <span>- Student from NUS</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>&quot;Love how I can compare listings by school!&quot;</p>
              <br />
              <span>- Student from SMU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>&quot;The filters and map view saved us so much time!&quot;</p>
              <br />
              <span>- Student from NTU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>
                &quot;I love that the listings were verified, and I could chat
                with landlords directly on the platform.&quot;
              </p>
              <br />
              <span>- Student from SMU</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How to Get Started */}
      <section className={`${styles.sectionLightBlue} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>How to Get Started</h2>
          <div className={styles.getStartedGrid}>
            <div className={styles.startStep}>
              <div className={styles.stepNumber}>1</div>
              <h3><b>Select your university</b></h3>
              <p>Use the dropdown at the top to pick your campus and see nearby listings.</p>
            </div>
            <div className={styles.startStep}>
              <div className={styles.stepNumber}>2</div>
              <h3><b>Filter and compare</b></h3>
              <p>Set your price, housing type, and amenities to find the best fit for you.</p>
            </div>
            <div className={styles.startStep}>
              <div className={styles.stepNumber}>3</div>
              <h3><b>Check locations</b></h3>
              <p>View listings on the map and explore transport routes, reviews, and safety tips.</p>
            </div>
            <div className={styles.startStep}>
              <div className={styles.stepNumber}>4</div>
              <h3><b>Chat or bookmark</b></h3>
              <p>Message agents or other students, save your favorites, and book your new home!</p>
            </div>
          </div>
        </div>
      </section>


      {/* 6. Frequently Asked Questions */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>Frequently Asked Questions</h2>

          <Accordion.Root
            className={styles.faqAccordion}
            type="multiple"
          >
            <Accordion.Item className={styles.faqItem} value="item-1">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  Is RentLah only for international students?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                No, RentLah is for <b>all students in Singapore</b>, both international and local.  
                <br /><br />
                We understand that international students often face more challenges finding housing, so the platform is designed to help with that. However, <b>local students looking for off-campus options</b>—whether for convenience, privacy, or flexibility—are just as welcome to use RentLah.
                <br /><br />
                Whether you&apos;re looking for a room near your university, short-term stays, or longer rental options, RentLah aims to make the housing search <b>simpler, safer, and student-friendly</b>.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={styles.faqItem} value="item-2">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  Are all listings verified?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                <b>Yes.</b> At RentLah, we manually verify listings whenever possible to reduce scams and ensure the safety of our users.
                <br /><br />
                We also rely on the <b>student community</b> to keep listings up-to-date. If you encounter any suspicious listings, you can easily report them through the app. Our team will review reported listings promptly and take action if needed.
                <br /><br />
                <b>Reviews from other students</b> also help keep landlords accountable and provide real-world feedback on the properties.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={styles.faqItem} value="item-3">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  How can I chat with a landlord or agent?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                You can <b>contact landlords or agents directly</b> using RentLah&apos;s <b>built-in chat system</b>.  
                <br /><br />
                Simply click on the listing you&apos;re interested in, then tap the <b>&quot;Message Landlord&quot;</b> button. You can ask about viewing dates, rental terms, or clarify any details before deciding.  
                <br /><br />
                All conversations are kept <b>inside the app</b> for safety and convenience, so you don&apos;t need to share your personal phone number until you&apos;re comfortable.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={styles.faqItem} value="item-4">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  Can I see listings on a map?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                Yes! RentLah provides an <b>interactive map view</b> for all listings.  
                <br /><br />
                You can easily filter by location, browse housing options near your campus, and view the surrounding area, including <b>MRT stations, bus stops, and amenities like supermarkets or cafes</b>.
                <br /><br />
                The map view helps you get a real sense of the neighbourhood before scheduling a visit.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={styles.faqItem} value="item-5">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  Is it free to use RentLah?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                <b>Yes, RentLah is completely free for students.</b>  
                <br /><br />
                You can search listings, chat with landlords, view maps, and read reviews without paying any fees. Our goal is to make housing more accessible and transparent for students without adding extra costs.
                <br /><br />
                Landlords and agents may sometimes include service fees or deposits as part of the rental process, but RentLah does not charge students for using the platform.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={styles.faqItem} value="item-6">
              <Accordion.Header className={styles.faqHeader}>
                <Accordion.Trigger className={styles.faqTrigger}>
                  What should I do if I face a problem with a landlord?
                  <ChevronDown className={styles.chevron} />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqContent}>
                If you experience any issues such as unexpected fees, unfulfilled promises, or uncomfortable interactions, you can <b>report the landlord or listing directly within RentLah</b>.  
                <br /><br />
                Our team will review the case and may contact you for more details. If necessary, we&apos;ll remove the listing or take additional action to protect students.  
                <br /><br />
                We also encourage you to leave a <b>detailed review</b> to help other students make informed decisions.
              </Accordion.Content>
            </Accordion.Item>

          </Accordion.Root>
        </div>
      </section>

    </main>
  );
}
