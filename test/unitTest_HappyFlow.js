const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("House Rental", function () {

  let contract, rentalPlatform;
  let tenant, landlord;
  let [tenantName, tenantPassword, tenantType, tenantPhone, tenantEmail] = ["Terry", "123", "tenant", "666", "terry@ubc.com"];
  let [landlordName, landlordPassword, landlordType, landlordPhone, landlordEmail] = ["William", "456", "landlord", "666", "william@ubc.ca"];
  let nullAddress = "0x0000000000000000000000000000000000000000";

  before(async function () {
    contract = await ethers.getContractFactory("HouseRental");
    [tenant, landlord] = await ethers.getSigners();
    rentalPlatform = await contract.deploy();
  });

  describe("Test starts", function () {
    it("1. Landlord and tenants can register accounts", async function () {
      await rentalPlatform.register(tenantName, tenantPassword, tenantType, tenantPhone, tenantEmail);
      await rentalPlatform.connect(landlord).register(landlordName, landlordPassword, landlordType, landlordPhone, landlordEmail);
      await expect({... await rentalPlatform.users(tenant.address)}.name).to.equal(tenantName);
      await expect({... await rentalPlatform.users(landlord.address)}.name).to.equal(landlordName);
    });

    it("2. Landlord and tenant can log into their accounts", async function () {
      await expect(rentalPlatform.logIn(tenantName, tenantPassword)).to.be.not.reverted;
      await expect(rentalPlatform.connect(landlord).logIn(landlordName, landlordPassword)).to.be.not.reverted;
    });
  
    it("3. Landlord can edit house info", async function() {
      let [houseAddress, rental, description, period] = ["1210 W 1st", "2100", "For renting", "Available from 01/01/2022"];
      await expect(rentalPlatform.connect(landlord).editHouseInfo(houseAddress, rental, description, period, true)).to.be.not.reverted;
      let landlordHouse = {... await rentalPlatform.houses(landlord.address)};
      
      await expect(landlordHouse.houseAddress).to.be.equal(houseAddress);
      await expect(landlordHouse.rental).to.be.equal(rental);
      await expect(landlordHouse.description).to.be.equal(description);
      await expect(landlordHouse.period).to.be.equal(period);
      await expect(landlordHouse.isHouseAvailable).to.be.true;
    });
    
    it("4. Tenant can edit his/her background", async function() {
      let [age, income, isMale, occupation] = [25, 100000, true, "Software Engineer"];
      await expect(rentalPlatform.editBackground(age, income, isMale, occupation)).to.be.not.reverted;
      let tenantBG = {... await rentalPlatform.backgrounds(tenant.address)};

      await expect(tenantBG.age).to.be.equal(age);
      await expect(tenantBG.income).to.be.equal(income);
      await expect(tenantBG.isMale).to.be.true;
      await expect(tenantBG.occupation).to.be.equal(occupation);
    });

    it("5. Check if house is still available", async function() {
      await expect(rentalPlatform.checkAvailability(landlord.address)).to.be.not.reverted;
      await expect(await rentalPlatform.checkAvailability(landlord.address)).to.be.true;
    });
    
    it("6. tenant can send background to landlord", async function () {
      await rentalPlatform.sendBackground(landlord.address);
      await expect (await rentalPlatform.landlordTenantsMap(landlord.address,0)).to.be.equal(tenant.address);
    });
  
    it("7. landlord can get the list of potential tenant", async function () {
      await rentalPlatform.connect(landlord).getPotentialTenants()
      await expect (await rentalPlatform.landlordTenantsMap(landlord.address,0)).to.be.equal(tenant.address);
    });

    it("8. landlord can get the background of potential tenant", async function () {
      await rentalPlatform.connect(landlord).getBackground(landlord.address);
      await expect (await rentalPlatform.landlordTenantsMap(landlord.address,0)).to.be.equal(tenant.address);
    });
    
    it("9. Landlord can send an agreement to a potential tenant if his house is available", async function () {
      await expect(await rentalPlatform.tenantLandlordMap(tenant.address)).to.be.equal(nullAddress);
      await expect({... await rentalPlatform.houses(landlord.address)}.isHouseAvailable).to.be.true;

      await expect(rentalPlatform.connect(landlord).sendAgreement(tenant.address)).to.be.not.reverted;      
      await expect(await rentalPlatform.tenantLandlordMap(tenant.address)).to.be.equal(landlord.address);
    });

    it("10. Tenant can sign an agreement from landlord", async function () {
      await expect({... await rentalPlatform.houses(landlord.address)}.isHouseAvailable).to.be.true;
      await expect(rentalPlatform.signAgreement()).to.be.not.reverted;      
      await expect({... await rentalPlatform.houses(landlord.address)}.isHouseAvailable).to.be.false;
    });
    
    it("11. Tenant can cancel the match", async function () {
      await expect(await rentalPlatform.tenantLandlordMap(tenant.address)).to.be.equal(landlord.address);
      await expect(rentalPlatform.cancelMatch()).to.be.not.reverted;      
      await expect(await rentalPlatform.tenantLandlordMap(tenant.address)).to.be.equal(nullAddress);
    });
  });
});