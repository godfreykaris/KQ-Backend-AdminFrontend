import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

interface Link {
  id: number;
  label: string;
  url: string;
}

const Data: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [links, setLinks] = useState<Link[]>([
    { id: 1, label: 'Fetch Flights', url: 'http://127.0.0.1:8000/flights' },
    { id: 2, label: 'Fetch Ticket', url: 'http://127.0.0.1:8000/ticket/{ticket_number}' },
    { id: 3, label: 'Available Destinations', url: 'http://127.0.0.1:8000/arrival_cities/{departure_city}' },
    { id: 15, label: 'Add City', url: 'http://127.0.0.1:8000/cities/add' },
    { id: 16, label: 'Change City', url: 'http://127.0.0.1:8000/cities/change/{cityId}' },
    { id: 17, label: 'Delete City', url: 'http://127.0.0.1:8000/cities/delete/{cityId}' },
    { id: 18, label: 'All Cities', url: 'http://127.0.0.1:8000/cities' },
    { id: 19, label: 'Fetch City', url: 'http://127.0.0.1:8000/cities/{cityName}/{cityCountry}' },
    { id: 4, label: 'Add Booking', url: 'http://127.0.0.1:8000/bookings' },
    { id: 5, label: 'Change Booking', url: 'http://127.0.0.1:8000/bookings/{booking_reference}' },
    { id: 6, label: 'Delete Booking', url: 'http://127.0.0.1:8000/bookings/{booking_reference}'},
    { id: 7, label: 'Guest Booking Inquiry', url: 'http://127.0.0.1:8000/booking_inquiry/guest'},
    { id: 8, label: 'Register A User', url: 'http://127.0.0.1:8000/users/register'},
    { id: 9, label: 'Registerd User Booking Inquiry', url: 'http://127.0.0.1:8000/booking_inquiry/registered_user'},
    { id: 10, label: 'Add Passengers', url: 'http://127.0.0.1:8000/passengers/add/{booking_reference}'},
    { id: 11, label: 'Delete Passenger', url: 'http://127.0.0.1:8000/passengers/delete/{passengerId}'},
    { id: 12, label: 'Change Passenger', url: 'http://127.0.0.1:8000/passengers/change/{passengerId}'},
    { id: 20, label: 'Add Employee', url: 'http://127.0.0.1:8000/employees/add'},
    { id: 21, label: 'Change Employee', url: 'http://127.0.0.1:8000/employees/change/{employeeId}'},
    { id: 22, label: 'Delete Employee', url: 'http://127.0.0.1:8000/employees/delete/{employeeId}'},
    { id: 23, label: 'Fetch Employees', url: 'http://127.0.0.1:8000/employees' },
    { id: 24, label: 'Fetch Employee', url: 'http://127.0.0.1:8000/employees/{employeeId}' },
    { id: 25, label: 'Add Qualification', url: 'http://127.0.0.1:8000/qualifications/add' },
    { id: 26, label: 'Change Qualification', url: 'http://127.0.0.1:8000/qualifications/change/{qualificationId}' },
    { id: 27, label: 'Delete Qualification', url: 'http://127.0.0.1:8000/qualifications/delete/{qualificationId}' },
    { id: 28, label: 'All Qualifications', url: 'http://127.0.0.1:8000/qualifications' },
    { id: 29, label: 'Fetch Qualification', url: 'http://127.0.0.1:8000/qualifications/{qualificationName}' },
    { id: 30, label: 'Add Skill', url: 'http://127.0.0.1:8000/skills/add' },
    { id: 31, label: 'Change Skill', url: 'http://127.0.0.1:8000/skills/change/{skillId}' },
    { id: 32, label: 'Delete Skill', url: 'http://127.0.0.1:8000/skills/delete/{skillId}' },
    { id: 33, label: 'All Skills', url: 'http://127.0.0.1:8000/skills' },
    { id: 34, label: 'Fetch Skill', url: 'http://127.0.0.1:8000/skills/{skillName}' },
    { id: 35, label: 'Add JobTitle', url: 'http://127.0.0.1:8000/jobTitles/add' },
    { id: 36, label: 'Change JobTitle', url: 'http://127.0.0.1:8000/jobTitles/change/{jobTitleId}' },
    { id: 37, label: 'Delete JobTitle', url: 'http://127.0.0.1:8000/jobTitles/delete/{jobTitleId}' },
    { id: 38, label: 'All JobTitles', url: 'http://127.0.0.1:8000/jobTitles' },
    { id: 39, label: 'Fetch JobTitle', url: 'http://127.0.0.1:8000/jobTitles/{jobTitleName}' },
    { id: 13, label: 'Match Employee', url: 'http://127.0.0.1:8000/openings/match_employees/{openingId}'},
    { id: 14, label: 'Print Ticket Report', url: 'http://127.0.0.1:8000/tickets/{ticket_number}/report'},
    
  ]);
  
  const fetchData = (url: string) => {
    fetch(url)
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/pdf')) {
          return response.blob(); // Extract the response as a Blob
        } else if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
      })
      .then((data) => {
        // If the response is a Blob (PDF file), display it in an iframe
        if (data instanceof Blob) {
          const url = URL.createObjectURL(data);
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.width = '100%';
          iframe.height = '600px'; // Set the desired height for the iframe
  
          // Append the iframe to a container on your web page
          const pdfContainer = document.getElementById('output-container');
          if(pdfContainer)
          {
            pdfContainer.innerHTML = ''; // Clear previous content, if any
            pdfContainer.appendChild(iframe);
          }
          
        } else {
          setData(data); // Process other types of responses (JSON or text) as you were doing before
        }
      })
      .catch((error) => console.error(error));
  
    // Scroll to the top of the page to view the output
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedLinks = links.map(link => {
      if (link.id === id) {
        return { ...link, label: event.target.value };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedLinks = links.map(link => {
      if (link.id === id) {
        return { ...link, url: event.target.value };
      }
      return link;
    });
    setLinks(updatedLinks);
    
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Calculate and set the width of each input field
    inputRefs.current.forEach(inputRef => {
      if (inputRef) {
        inputRef.style.width = `${inputRef.value.length * 8}px`; // Adjust the multiplication factor as needed
      }
    });
  }, [links]);

  const addBooking = () => {
    const bookingData = {
      flight_id: 1,
      email: 'johndoe@example.com',      
      passengers : [
        {
          name: 'John Doe',
          date_of_birth: '2022-08-12', // Convert the date format to 'YYYY-MM-DD'
          passport_number: "jdfhvjvs",
          identification_number: "jfkvdfb",
          seat_id: 1,
          // Add other passenger details
        },
        {
          name: 'Jane Smith',
          date_of_birth: '2023-10-15', // Convert the date format to 'YYYY-MM-DD'
          passport_number: "jdfhvjvs",
          identification_number: "jfkvdfb",
          seat_id: 1,
          // Add other passenger details
        },
      ],
      // Add other booking details
    };

    fetch('http://127.0.0.1:8000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify(bookingData),
    })
      .then(response => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then(data => setData(data))
      .catch(error => console.error(error));

    // Scroll to the top of the page to view the output
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const changeBooking = () => {
    const bookingData = {
      flight_id: 1,
      email: 'johndoe@example.com',
      passengers : [
        {
          passenger_id: "djkdvdfjk",
          name: 'John Doe',
          date_of_birth: '2022-08-12', // Convert the date format to 'YYYY-MM-DD'
          passport_number: "jdfhvjvs",
          identification_number: "jfkvdfb",
          seat_id: 1,
          // Add other passenger details
        },
        {
          passenger_id: "djkdvdfjk",
          name: 'Jane Smith',
          date_of_birth: '2023-10-15', // Convert the date format to 'YYYY-MM-DD'
          passport_number: "jdfhvjvs",
          identification_number: "jfkvdfb",
          seat_id: 1,
          // Add other passenger details
        },
      ]
      // Add other booking details
    };

    const changeBookingUrl = links.find((link) => link.id === 5)?.url;

    if (changeBookingUrl) {
      fetch(changeBookingUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }

    // Scroll to the top of the page to view the output
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const deleteBooking = () => {
  const deleteBookingUrl = links.find((link) => link.id === 6)?.url;

  if (deleteBookingUrl) {
    fetch(deleteBookingUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const guestBookingInquiry = () => {
  const bookingInquiryData = {
    booking_inquiry_type_id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    subject: 'Booking cancellation',
    message: 'I need to cancel the booking with this reference number CSJFGHJ.',
    // Add other booking details
  };

  const guestBookingInquiryUrl = links.find((link) => link.id === 7)?.url;

  if (guestBookingInquiryUrl) {
    fetch(guestBookingInquiryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(bookingInquiryData),
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

};

const registerUser = () => {
  const registerUserData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'jdskfbvdijkdbhadh',
    // Add other booking details
  };

  const registerUserUrl = links.find((link) => link.id === 8)?.url;

  if (registerUserUrl) {
    fetch(registerUserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(registerUserData),
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const accountBasedBookingInquiry = () => {
  const bookingInquiryData = {
    user_id: 1,
    booking_inquiry_type_id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    subject: 'Booking cancellation',
    message: 'I need to cancel the booking with this reference number CSJFGHJ.',
    // Add other booking details
  };

  const accountBasedBookingInquiryUrl = links.find((link) => link.id === 9)?.url;

  if (accountBasedBookingInquiryUrl) {
    fetch(accountBasedBookingInquiryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(bookingInquiryData),
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const addPassengers = () => {
  const passengersData = [
    {
      name: 'John Doe',
      date_of_birth: '2022-08-12', // Convert the date format to 'YYYY-MM-DD'
      passport_number: "jdfhvjvs",
      identification_number: "jfkvdfb",
      seat_id: 1,
      // Add other passenger details
    },
    {
      name: 'Jane Smith',
      date_of_birth: '2023-10-15', // Convert the date format to 'YYYY-MM-DD'
      passport_number: "jdfhvjvs",
      identification_number: "jfkvdfb",
      seat_id: 1,
      // Add other passenger details
    },
  ];

  const addPassengersUrl = links.find((link) => link.id === 10)?.url;

  if (addPassengersUrl) {
    fetch(addPassengersUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify({ passengers: passengersData }),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deletePassenger = () => {
  
  const deletePassengerUrl = links.find((link) => link.id === 11)?.url;

  if (deletePassengerUrl) {
    fetch(deletePassengerUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changePassenger = () => {
  const passengerData = {
    'name' : 'John Doe',
    'date_of_birth' : '2022-08-12', // Convert the date format to 'YYYY-MM-DD'
    'passport_number': 'jdfhvjvs',
     'identification_number': 'jfkvdfb',
     'seat_id': 1,
    
  };

  const  changePassengerUrl = links.find((link) => link.id === 12)?.url;

  if (changePassengerUrl) {
    fetch(changePassengerUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(passengerData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const addCity = () => {
  const cityData = {
    name: 'Washington',
    country: 'United States of America',   
    
  };

  const  addCityUrl = links.find((link) => link.id === 15)?.url;

  if (addCityUrl) {
    fetch(addCityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(cityData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeCity = () => {
  const cityData = {
    name: 'Washington',
    country: 'United States of America',   
    
  };

  const  changeCityUrl = links.find((link) => link.id === 16)?.url;

  if (changeCityUrl) {
    fetch(changeCityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(cityData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deleteCity = () => {
  
  const deleteCityUrl = links.find((link) => link.id === 17)?.url;

  if (deleteCityUrl) {
    fetch(deleteCityUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const addEmployee = () => {
  const employeeData = 
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "date_of_birth": "1990-01-01",
      "address": "123 Main Street",
      "job_title_id": 1,
      "qualifications": [1, 2, 3],
      "skills": [1, 2, 3],
    };

  const addEmployeeUrl = links.find((link) => link.id === 20)?.url;

  if (addEmployeeUrl) {
    fetch(addEmployeeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeEmployee = () => {
  const employeeData = 
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "date_of_birth": "1990-01-01",
      "address": "123 Main Street",
      "job_title_id": 1,
      "qualifications": [1, 2, 3],
      "skills": [1, 2, 3, 6],
    };

  const changeEmployeeUrl = links.find((link) => link.id === 21)?.url;

  if (changeEmployeeUrl) {
    fetch(changeEmployeeUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deleteEmployee = () => {
  
  const deleteEmployeeUrl = links.find((link) => link.id === 22)?.url;

  if (deleteEmployeeUrl) {
    fetch(deleteEmployeeUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const addQualification = () => {
  const qualificationData = {
    name: 'Bachelor\'s Degree in Aeronautical Engineering',
    
  };

  const  addQualificationUrl = links.find((link) => link.id === 25)?.url;

  if (addQualificationUrl) {
    fetch(addQualificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(qualificationData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeQualification = () => {
  const qualificationData = {
    name: 'Bachelor\'s Degree in Aeronautical Engineering',
    
  };

  const  changeQualificationUrl = links.find((link) => link.id === 26)?.url;

  if (changeQualificationUrl) {
    fetch(changeQualificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(qualificationData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deleteQualification = () => {
  
  const deleteQualificationUrl = links.find((link) => link.id === 27)?.url;

  if (deleteQualificationUrl) {
    fetch(deleteQualificationUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const addSkill = () => {
  const skillData = {
    name: 'Aircraft Maintenance',
    
  };

  const  addSkillUrl = links.find((link) => link.id === 30)?.url;

  if (addSkillUrl) {
    fetch(addSkillUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(skillData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeSkill = () => {
  const skillData = {
    name: 'Aircraft Maintenance',
    
  };

  const  changeSkillUrl = links.find((link) => link.id === 31)?.url;

  if (changeSkillUrl) {
    fetch(changeSkillUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(skillData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deleteSkill = () => {
  
  const deleteSkillUrl = links.find((link) => link.id === 32)?.url;

  if (deleteSkillUrl) {
    fetch(deleteSkillUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};


const addJobTitle = () => {
  const jobTitleData = {
    name: 'Aircraft Maintenance',
    
  };

  const  addJobTitleUrl = links.find((link) => link.id === 35)?.url;

  if (addJobTitleUrl) {
    fetch(addJobTitleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(jobTitleData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const changeJobTitle = () => {
  const jobTitleData = {
    name: 'Aircraft Maintenance',
    
  };

  const  changeJobTitleUrl = links.find((link) => link.id === 36)?.url;

  if (changeJobTitleUrl) {
    fetch(changeJobTitleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify(jobTitleData),
    })
      .then((response) => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json(); // Extract the response as JSON
          } else {
            return response.text(); // Extract the response as text
          }
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const deleteJobTitle = () => {
  
  const deleteJobTitleUrl = links.find((link) => link.id === 37)?.url;

  if (deleteJobTitleUrl) {
    fetch(deleteJobTitleUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      }
    })
      .then((response) => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Extract the response as JSON
        } else {
          return response.text(); // Extract the response as text
        }
    })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  // Scroll to the top of the page to view the output
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', paddingRight: '1rem', borderRight: '1px solid #ccc' }}>
        <h2>Routes:</h2>
        {links.map(link => (
          <div key={link.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ marginRight: '1rem', marginBottom: '0.5rem', color: 'rgb(94, 129, 157)' }}>{link.label}</p>
              {link.label === 'Add Booking' ? (
                <button onClick={addBooking} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change Booking' ? (
                <button onClick={changeBooking} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Delete Booking' ? (
                <button onClick={deleteBooking} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Guest Booking Inquiry' ? (
                <button onClick={guestBookingInquiry} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) :  link.label === 'Register A User' ? (
                <button onClick={registerUser} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Registerd User Booking Inquiry' ? (
                <button onClick={accountBasedBookingInquiry} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add Passengers' ? (
                <button onClick={addPassengers} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Delete Passenger' ? (
                <button onClick={deletePassenger} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change Passenger' ? (
                <button onClick={changePassenger} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add City' ? (
                <button onClick={addCity} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change City' ? (
                <button onClick={changeCity} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label} 
                </button>
              ) : link.label === 'Delete City' ? (
                <button onClick={deleteCity} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add Employee' ? (
                <button onClick={addEmployee} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change Employee' ? (
                <button onClick={changeEmployee} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Delete Employee' ? (
                <button onClick={deleteEmployee} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add Qualification' ? (
                <button onClick={addQualification} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change Qualification' ? (
                <button onClick={changeQualification} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label} 
                </button>
              ) : link.label === 'Delete Qualification' ? (
                <button onClick={deleteQualification} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add Skill' ? (
                <button onClick={addSkill} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change Skill' ? (
                <button onClick={changeSkill} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label} 
                </button>
              ) : link.label === 'Delete Skill' ? (
                <button onClick={deleteSkill} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Add JobTitle' ? (
                <button onClick={addJobTitle} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) : link.label === 'Change JobTitle' ? (
                <button onClick={changeJobTitle} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label} 
                </button>
              ) : link.label === 'Delete JobTitle' ? (
                <button onClick={deleteJobTitle} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              ) :(
                <button onClick={() => fetchData(link.url)} style={{ backgroundColor: 'rgb(0, 128, 128)', marginBottom: '0.1rem' }}>
                  {link.label}
                </button>
              )}

            </div>
            <div>
              <input
                type="text"
                value={link.url}
                onChange={e => handleUrlChange(e, link.id)}
                ref={inputRef => (inputRefs.current[link.id] = inputRef)}
                style={{ width: 'auto' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div id='output-container' style={{ width: '50%', paddingLeft: '1rem' }}>
        <h2>Output:</h2>
        {typeof data === 'object' ? (
           <pre>{JSON.stringify(data, null, 2)}</pre> // Render as formatted JSON
         ) : (
           <p>{data}</p> // Render as plain text
        )}
      </div>
    </div>
  );
};

export default Data;
