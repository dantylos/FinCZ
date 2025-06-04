# FinanceCZ
FinanceCZ is a web platform designed to facilitate communication and knowledge sharing about the world of finance. The core idea is to foster human interaction by allowing users to create posts (threads), comment on discussions, and stay updated with live stock indices and rates. This community-driven site acts as a hub for finance enthusiasts to exchange ideas and insights.

## What is this project about?
Czech Financial Forum is a practical showcase of multi-service secured web application built secure-by-design demonstrating protection from various types of attacks like HTML shielding, database queries parameterization and CORS policy configuration.

## Features  
- User-generated posts (threads) to start finance-related discussions  
- Commenting system for interactive conversations  
- Real-time display of stock indices and rates  
- Responsive and user-friendly web interface
- Rendering solutions for the user made content have an HTML shielding to prevent JS injections
- Parameterized queries on back-end for SQL injections protection

## IP filtering and decoy mechanism
CzFF has an implemented IP filtering mechanism, which prevents all the unwanted (coming outside of Czech Republic) traffic. Third party solution from ip-api was used for IP geolocation and VPN/Proxy detection. All the incoming traffic  Additionally, on this level strict CORS policy for accepted domains is implemented to prevent CSRF attacks.
Additionally, special decoy webpage with simulation of a realistic infitine loading screen, whcich will help to make it harder to probe our security measures for unwanted traffic.
 

## Technologies Used  
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![bcrypt](https://img.shields.io/badge/-bcrypt-B91C2B?style=for-the-badge&logo=npm&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/-jsonwebtoken-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![AWS](https://img.shields.io/badge/-AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Render](https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## Usage  
- Register or log in to start creating posts and comments.  
- Browse stock indices to stay updated on market trends.  
- Engage with the community by sharing your insights and opinions.  
