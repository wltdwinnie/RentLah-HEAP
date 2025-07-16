"use client";
import styles from './Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { UniversityDropdown } from '@/components/quickfilters/university-filter';
import { useRouter } from 'next/navigation';
import { PropertyCardGroup } from "@/components/propertycard-group";
import { sampleListings } from "@/lib/sample-data";
import { ShieldCheck, Wallet, MapPin, Users} from "lucide-react";

const featuredListings = sampleListings.slice(0, 3); // Adjust the number as needed

export default function Home() {
  const router = useRouter();

  const handleUniversitySelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
    <main>
      {/* 1. Welcome Section */}
      <section>
        <div className={styles.sectionInner}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.title}>
              <span className={styles.whitetext}>Welcome to </span>
              RentLah!
            </h1>
            <p className={styles.welcdescription}>
              Looking for a place to stay while studying in Singapore? <br></br> You've come to the right place. 
            </p>
            <p className={styles.welcdescription}>
              Select your university below to get started!
            </p>
            <UniversityDropdown
              className="w-[400px] my-6"
              onSelect={handleUniversitySelect}
            />
          </div>
        </div>
      </section>

      {/* 2. Featured Listings */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subTitle}>Featured Listings</h2>
          </div>
          <div>
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
              <ShieldCheck className="h-10 w-10 text-primary"/>
              <h3><b>Verified Listings</b></h3>
              <p>All properties are verified by our team to ensure safety and accuracy.</p>
            </div>
            <div className={styles.benefitCard}>
              <Wallet className="h-10 w-10 text-primary"/>
              <h3><b>Student Budget Friendly</b></h3>
              <p>Find accommodations that fit your student budget with no hidden fees.</p>
            </div>
            <div className={styles.benefitCard}>
              <MapPin className="h-10 w-10 text-primary"/>
              <h3><b>Campus Proximity</b></h3>
              <p>Properties near major universities, polytechnics and junior colleges.</p>
            </div>
            <div className={styles.benefitCard}>
              <Users className="h-10 w-10 text-primary"/>
              <h3><b>Student Community</b></h3>
              <p>Connect with other students and find compatible roommates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>Students&apos; Testimonials</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <p>"Super convenient! I found a room near NUS in just 3 days."</p>
              <br></br>
              <span>- Student from NUS</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>"Love how I can compare listings by school!"</p>
              <br></br>
              <span>- Student from SMU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>"The filters and map view saved us so much time!"</p>
              <br></br>
              <span>- Student from NTU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>"I love that the listings were verified, and I could chat with landlords directly on the platform."</p>
              <br></br>
              <span>- Student from SMU</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
