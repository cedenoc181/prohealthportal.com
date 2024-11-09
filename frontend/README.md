# ProHealthPortal.com - README

## Overview
ProHealth Portal is designed to help physical therapy clinic staff, physical therapist, occupational therapist, front desk, office managers and billing department manage their day-to-day tasks efficiently. The application allows staff to track patient interactions, manage inventory, handle referrals, and schedule patient appointments with ease. This web-based solution streamlines clinic operations by providing a centralized dashboard for managing key elements such as inventory, patient appointments, outreach, and referrals.

## Key Features

- **Lead Generation for APOS Treatment**: Support ProHealth's business model by generating leads for APOS Treatment, which contributes to 60% of the clinic's revenue. This is achieved by scraping potential leads using the Puppeteer library and formatting the data for targeted advertising.

- **Authentication**: Secure access to the application using JWT-based authentication, ensuring that only authorized users can access sensitive clinic information.

- **Medical Document Management**: Store and manage medical documents using AWS S3 and Rails Active Storage, ensuring secure and scalable access for clinic records.

- **Email Template Management**: Maintain a database of email templates that users can create, update, delete, and customize as needed. This feature allows for easy communication and standardized messaging across the clinic.

- **Inventory and Task Management**: Manage and track inventory and tasks for clinic administrators, improving efficiency and organization of clinic operations.


- **Patient Retention Tracking**: Keep track of outreach activities, including whether patients are interested in services or pending insurance/referrals. Each outreach entry contains information such as patient status, scheduled information, and outreach date.

- **Referral Management**: Manage referrals, whether internal or external, for patients. Each referral entry includes the referring doctor, date, and whether it is an internal or external referral.

- **Inventory Management**: Manage clinic inventory with ease. Track available supplies, items that are low or insufficient, and supplies that are currently on order. The application provides a detailed table format for easy review of inventory status, including item type, count, and status.

## Technologies Used
- **Ruby on Rails**: Backend framework used to manage server-side logic, data storage, and APIs.

- **Puppeteer Library**: Used for web scraping to gather lead data for APOS Treatment.

- **PostgreSQL**: Database used for storing patient, inventory, and other clinic-related data.

- **React.js**: The front-end of the application is built using React.js to provide a dynamic and responsive user interface.

- **Redux**: State management is handled using Redux, ensuring that data flows efficiently across components.

- **Chakra UI**: Components like input groups and buttons are styled using Chakra UI, enhancing the UI/UX.

- **JavaScript/JSX**: Used to implement dynamic behavior, such as adding or editing rows in tables, updating statuses, and managing form inputs.

- **CSS**: Custom styling to provide a consistent, user-friendly interface for the application.



## Application Flow
1. **Inventory and Supplies Management**:
   - Staff members can view tables listing available inventory with statuses like "Available," "Low," or "Insufficient."
   - Supplies that are low or insufficient are highlighted for easy identification.
   - Staff can add new inventory items, update existing items, and move delivered items from "Order Status" to "Available Supplies."

2. **Medical Document Management**:
   - Store and manage medical documents securely using AWS S3 and Rails Active Storage.
   - Clinic staff can easily upload, update, and retrieve medical documents as needed.

3. **Patient Management**:
   - Appointments can be scheduled, confirmed, or updated by clinic staff.
   - The application keeps track of outreach activities and displays patient engagement details such as interested status and pending referrals.

4. **Email Template Management**:
   - Staff can create, update, and delete email templates for standardized communication.
   - Templates can be customized to meet the specific needs of patients and other stakeholders.

5. **Referral Tracking**:
   - Referrals are logged with details about whether they are internal or external, the referring physician, and referral dates.
   - This helps staff manage patient transitions within or outside the clinic.

6. **Lead Generation for APOS Treatment**:
   - The application scrapes potential leads using the Puppeteer library.
   - The scraped data is formatted in a digestible format, allowing ProHealth to advertise effectively and generate leads for APOS Treatment.

7. **Request Form for Supplies**:
   - Staff can request new supplies through an easy-to-use form that includes input fields for item type, link, category, and count.
   - The form includes a submit button for easy submission of requests and consistent formatting for a better user experience.

2. **Patient Management**:
   - Appointments can be scheduled, confirmed, or updated by clinic staff.
   - The application keeps track of outreach activities and displays patient engagement details such as interested status and pending referrals.

3. **Referral Tracking**:
   - Referrals are logged with details about whether they are internal or external, the referring physician, and referral dates.
   - This helps staff manage patient transitions within or outside the clinic.

4. **Request Form for Supplies**:
   - Staff can request new supplies through an easy-to-use form that includes input fields for item type, link, category, and count.
   - The form includes a submit button for easy submission of requests and consistent formatting for a better user experience.

## Getting Started
To get started with this project, you will need Node.js installed on your local machine.

### Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/cedenoc181/prohealthportal.com.git
   ```

2. Navigate to the project directory and install dependencies.
   ```bash
   ccd prohealthportal.com
   bundle install

   follow by 

   cd frontend
   npm install
   ```

3. Start the development server.
   ```bash
   rails s 
 
     and 

   npm start
   ```

4. Navigate to `http://localhost:3000` to view the application.

## Usage
- **Navigating the Dashboard**: The navigation bar on the side allows users to access features such as Inventory, Patient Appointments, Outreach, Referrals, and Requests.
- **Updating Information**: Clinic staff can click on inventory items, patients, or requests to update or edit information.
- **Adding New Data**: New inventory items, patient outreach records, and requests can be added through forms accessible on each feature page.

## Future Improvements
- **Reporting**: Provide data analytics and reports for clinic inventory, patient engagement, and referrals.
- **API Integration**: Integrate with other healthcare platforms or systems to import/export data.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
If you have any questions, please feel free to reach out:
- **Author**: Christian Cedeno
- **Email**: Christiancedenob.f@gmail.com

