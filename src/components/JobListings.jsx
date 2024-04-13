import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
// UseState is used to store the data, and useState is used to store the state.
// jobs, loading are the two class states
  const [jobs, setJobs] = useState([]);   // the jobs stores the data fetched from the API, this state is passed to component JobListing
  const [loading, setLoading] = useState(true);

// This useEffet takes in function(calback function) and dependency array, 
//which is used to run the function only when the dependency array changes.
// usually array is kept empty, otherwise it will get caught in loop
//UseEffect is used to fetch data from API, and then set the state.
  useEffect(() => {
    const fetchJobs = async () => {
        // isHome is prop is passed from the main, deafult value is false
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';  // 'api' will be replaced by http://localhost:8000 
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* This is an array of jobs, so we have to loop through it */}
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobListings;