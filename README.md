# React Rental DApp on Ethereum

This DApp is hosted on Netlify at https://decentralized-react-rental-platform-on-ethereum.netlify.app and the smart contract (which serves as a backend for this web app / DApp) was hosted on Ropsten testnet at https://ropsten.etherscan.io/address/0xf0f388786dD9e6AB08807734e08567Bb6E7EF331.

## Table of Contents

- [White Paper](#white-paper)
- [Tech Stack Specification](#tech-stack-specification)
- [Demo](#demo)
  - [Login Page](#login-page)
  - [Home Page](#home-page)
  - [House Info Page](#house-info-page)
  - [Landlord My Tenants Page](#landlord-my-tenants-page)
  - [Tenant Sign Agreement Page](#tenant-sign-agreement-page)
  - [Landlord Edit House Info Page](#landlord-edit-house-info-page)
  - [Tenant My Background Page](#tenant-my-background-page)

# White Paper

More details about the design of this project could be found at our white paper: https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/white_paper.pdf
<br>

<br>Presentation slide: https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/presentation.pdf
<br>

# Tech Stack Specification

1. ReactJS version: ^16.8.6
2. Web3.js: ^1.3.0
3. Hardhat: ^4.0
4. Solidity: 0.8.7

# Demo

## Login Page

User can click the metamask icon to connect their metamask account to the site
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/login_page.png)
<br>

A popup window to show you sign in successfully
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/signin_successfully.png)
<br>

Sign up page after clicking the "SIGN UP" button
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/signup_page.png)
<br>

## Home Page

Home Page
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/home_page_up.png)
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/home_page_down.png)
<br>

Tab "Houses" on the top left of the home page will direct you to all the available houses on our platform, user can check out the details of the house by clicking the house.
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/home_page_houses_available.png)
<br>

## House Info Page

After clicking the house on the "Houses" page, user can see the details of the house
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/home_page_houseinfo.png)
<br>

If you logged in as a tenant, you should be able to express your interest in this house
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/home_page_houseinfo_express_interest.png)
<br>

## Landlord My Tenants Page

If a tenant expressed interest in your house, you could find the personal information of that tenant under "My Tenants" tab (if you currently logged in as a landlord)
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/landlord_my_tenants.png)
<br>

You can send a rental contract to the tenant of your interest
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/landlord_send_agreement.png)
<br>

## Tenant Sign Agreement Page

A tenant can choose to sign the contract or not, once signed, the deal is made and the house will be removed from our platform because it is already unavailable for rent
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/tenant_sign_agreement.png)
<br>

## Landlord Edit House Info Page

A landlord can click "My House" to view the current information of his/her house on our platform
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/landlord_myhouse.png)
<br>

A landlord can edit the information of his/her house
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/landlord_edit_house_info.png)
<br>

## Tenant My Background Page

Likewise, a tenant can also edit his/her background
![](https://github.com/kwanhiuhong/React-Rental-Dapp-on-Blockchain/blob/main/readme_images/tenant_mybackground.png)
<br>
