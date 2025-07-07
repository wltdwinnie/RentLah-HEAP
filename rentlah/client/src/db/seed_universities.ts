import { createUniversities } from "./queries/insert";
import { deleteAllUniversities } from "./queries/delete";
import { UNIVERSITIES } from "@/lib/constants";

(async () => {
  try {
    console.log('Database connection established. Deleting existing listings...');
    // Delete existing listings before seeding
    await deleteAllUniversities(); 

    await createUniversities([...UNIVERSITIES]);
    
    console.log(`Successfully seeded ${UNIVERSITIES.length} sample listings.`);
    // console.log(`Successfully seeded sample listings.`);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    // For seed scripts, exit the process to close any remaining connections
    process.exit(0);
  }
})();

