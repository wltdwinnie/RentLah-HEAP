"use client";
import styles from './Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { UniversityDropdown } from '@/components/quickfilters/university-filter';
import { useRouter } from 'next/navigation';


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
      <section className={`${styles.section} ${styles.sectionLightBlue}`}>
        <div className={styles.sectionInner}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.title}>Welcome to RentLah!</h1>
            <p className={styles.description}>
              Looking for a place to stay while studying in Singapore? You've come to the right place. RentLah is built <i>for students, by students</i> — making your search for affordable and convenient housing easier than ever.
            </p>
            <p className={styles.description}>
              Start by selecting your university from the search bar. We'll show you listings located near your campus, so you can focus on what matters most: your studies, friends, and the student experience.
            </p>
            <p className={styles.description}>
              Your next student home is just a few clicks away. Start exploring today!
            </p>
            <UniversityDropdown 
              className="w-[400px] my-6" 
              onSelect={handleUniversitySelect}
            />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image 
            src="/assets/building.png" 
            alt="Decoration" 
            width={500} height={1000} 
            className="max-w-full h-auto object-contain"
            priority/>
        </div>
      </section>

      {/* 2. Featured Listings */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subTitle}>Featured Listings</h2>
            <Link href="/listings" className={styles.viewAll}>View All</Link>
          </div>
          <div>[Listings will go here]</div>
        </div>
      </section>

      {/* 3. Why Choose RentLah */}
      <section className={`${styles.sectionLightBlue} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>Why Singapore Students Choose RentLah</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3><b>Verified Listings</b></h3>
              <p>All properties are verified by our team to ensure safety and accuracy.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3><b>Student Budget Friendly</b></h3>
              <p>Find accommodations that fit your student budget with no hidden fees.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3><b>Campus Proximity</b></h3>
              <p>Properties near major universities, polytechnics and junior colleges.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3><b>Student Community</b></h3>
              <p>Connect with other students and find compatible roommates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className={`${styles.sectionWhite} ${styles.section}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subTitle}>Students' Testimonials</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonialCard}>
              <p>"Super convenient! I found a room near NUS in just 3 days."</p>
              <span>- Student from NUS</span>
            </div>
            <div className={styles.testimonialCard}>
              <p>"Love how I can compare listings by school!"</p>
              <span>- Student from SMU</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
