"use client";
import styles from './Home.module.css';
import { UniversityDropdown } from '@/components/quickfilters/university-filter';
import { useRouter } from 'next/navigation';
import { PropertyCardGroup } from "@/components/propertycard-group";
import { ShieldCheck, Wallet, MapPin, Users} from "lucide-react";
import { fetchListings } from '@/lib/fetchListings';
import { useEffect, useState } from 'react';
import { Listing } from '@/lib/definition';

export default function Home() {
  const router = useRouter();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchListings({ isFeatured: true }).then((data) => setFeaturedListings(data));
    });

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
              Looking for a place to stay while studying in Singapore? <br /> You&apos;ve come to the right place. 
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
              <p>&quot;Super convenient! I found a room near NUS in just 3 days.&quot;</p>
              <br></br>
              <span>- Student from NUS</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>&quot;Love how I can compare listings by school!&quot;</p>
              <br></br>
              <span>- Student from SMU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>&quot;The filters and map view saved us so much time!&quot;</p>
              <br></br>
              <span>- Student from NTU</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>&quot;I love that the listings were verified, and I could chat with landlords directly on the platform.&quot;</p>
              <br></br>
              <span>- Student from SMU</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
