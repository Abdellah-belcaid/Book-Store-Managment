# Book Store Management Application  
This is a web-based application built using Spring Boot and Angular. It is a book store management system that allows users to manage books, categories, and orders. The backend is built using Spring Boot with Spring Security and JWT authentication, while the frontend is built using Angular with Angular Material for the user interface.
     
## Table of Contents       
* Getting Started  
* Prerequisites  
* Installation  
* Features   
* Technologies Used  
* Contributing  
* License  
## Getting Started    
### Prerequisites  
Before running this application, you need to have the following software installed on your system:    

- Java Development Kit (JDK) version 11 or later  
- Node.js version 14 or later  
- Angular CLI version 13 or later   
### Installation  
Follow these steps to install and run the application:

1. Clone the repository:   
```  
git clone https://github.com/<your-github-username>/book-store-management.git
```    
Navigate to the backend directory and run the following command to start the Spring Boot application:   
```  
./mvnw spring-boot:run   
```    
Navigate to the frontend directory and run the following command to install the required packages:   
```    
npm install   
```    
After the packages are installed, run the following command to start the Angular application:   
```    
ng serve   
```    
Open your browser and navigate to http://localhost:4200 to access the application.     

### Features   
The following features are implemented in this application:    

- User authentication using JWT  
- Authorization and role-based access control using Spring Security   
- CRUD operations for books and categories   
- Ordering books    
- Responsive UI using Angular Material  
### Technologies Used   
The following technologies and frameworks are used in this application:

- Spring Boot  
- Spring Security  
- JWT  
- Angular 
- Angular Material  
- MySQL 
### Contributing  
If you want to contribute to this project, please follow these steps:

Fork the repository  
Create a new branch (git checkout -b feature/your-feature)  
Make changes and commit them (git commit -m 'Add your feature')   
Push the changes to your branch (git push origin feature/your-feature)   
Create a pull request   
# License  
- This project is licensed under the MIT License - see the LICENSE file for details.