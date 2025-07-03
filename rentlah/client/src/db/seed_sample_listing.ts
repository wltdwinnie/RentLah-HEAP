import { createListings } from "./queries/insert";
import { sampleListings } from '@/lib/sample-data';
import { transformListingForDB } from '@/lib/utils';
import { deleteAllListings } from "./queries/delete";

(async () => {
  try {
    console.log('Database connection established. Deleting existing listings...');
    // Delete existing listings before seeding
    await deleteAllListings(); // Assuming createListings is a model or function to delete
    
    // Transform sample listings to database format
    const transformedListings = sampleListings.map(transformListingForDB);
    // const transformedListing = transformListingForDB(sampleListings[0]);
    
    // Call the function to seed sample listings
    await createListings(transformedListings);
    console.log(`Successfully seeded ${transformedListings.length} sample listings.`);
    // console.log(`Successfully seeded sample listings.`);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    // For seed scripts, exit the process to close any remaining connections
    process.exit(0);
  }
})();

