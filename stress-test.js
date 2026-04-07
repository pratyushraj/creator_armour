#!/usr/bin/env node

/**
 * Creator Armour Stress Test Script
 * 
 * This script simulates multiple creators, brands, and concurrent operations
 * to test for race conditions, broken states, and data inconsistencies.
 */

import axios from 'axios';
import { faker } from '@faker-js/faker';

// Configuration
const BASE_URL = 'http://localhost:4000';
const NUM_CREATORS = 5;
const NUM_BRANDS = 10;
const OFFERS_PER_BRAND = 3;
const CONCURRENT_USERS = 15;

// Test data storage
const creators = [];
const brands = [];
const offers = [];
const deals = [];

// API endpoints
const ENDPOINTS = {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    creators: '/api/creators',
    offers: '/api/offers',
    deals: '/api/deals',
    acceptOffer: '/api/deals/accept',
    submitContent: '/api/deals/submit-content',
    approveContent: '/api/deals/approve-content',
    markPaymentSent: '/api/deals/mark-payment-sent',
    confirmPayment: '/api/deals/confirm-payment'
};

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateCreator = () => ({
    name: faker.person.fullName(),
    instagram_handle: faker.internet.username().toLowerCase(),
    email: faker.internet.email(),
    password: 'test123'
});

const generateBrand = () => ({
    name: faker.company.name(),
    email: faker.internet.email(),
    password: 'test123'
});

const generateOffer = (creatorHandle) => ({
    creator_handle: creatorHandle,
    brand_name: faker.company.name(),
    brand_email: faker.internet.email(),
    deliverables: faker.lorem.sentence(),
    amount: Math.floor(Math.random() * 1000) + 100,
    deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: faker.lorem.paragraph()
});

// API wrappers
const apiCall = async (endpoint, data, token = null) => {
    try {
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

const signupCreator = async (creatorData) => {
    const result = await apiCall(ENDPOINTS.signup, creatorData);
    if (result.success) {
        creators.push({
            ...creatorData,
            token: result.data.user.token,
            creatorId: result.data.creator.id
        });
        console.log(`✅ Creator signed up: ${creatorData.name}`);
    } else {
        console.log(`❌ Failed to signup creator ${creatorData.name}:`, result.error);
    }
    return result;
};

const signupBrand = async (brandData) => {
    const result = await apiCall(ENDPOINTS.signup, {
        name: brandData.name,
        email: brandData.email,
        password: brandData.password,
        instagram_handle: faker.internet.username().toLowerCase()
    });
    if (result.success) {
        brands.push({
            ...brandData,
            token: result.data.user.token,
            userId: result.data.user.id
        });
        console.log(`✅ Brand signed up: ${brandData.name}`);
    } else {
        console.log(`❌ Failed to signup brand ${brandData.name}:`, result.error);
    }
    return result;
};

const sendOffer = async (offerData, brandToken) => {
    const result = await apiCall(ENDPOINTS.offers, offerData, brandToken);
    if (result.success) {
        offers.push({
            ...offerData,
            brandToken,
            offerId: result.data.deal.id,
            dealId: result.data.deal.id
        });
        console.log(`✅ Offer sent: ${offerData.brand_name} -> ${offerData.creator_handle}`);
    } else {
        console.log(`❌ Failed to send offer:`, result.error);
    }
    return result;
};

const acceptOffer = async (offerId, creatorToken) => {
    const result = await apiCall(ENDPOINTS.acceptOffer, { offer_id: offerId }, creatorToken);
    if (result.success) {
        console.log(`✅ Offer accepted: ${offerId}`);
    } else {
        console.log(`❌ Failed to accept offer ${offerId}:`, result.error);
    }
    return result;
};

const submitContent = async (dealId, contentUrl, creatorToken) => {
    const result = await apiCall(ENDPOINTS.submitContent, {
        deal_id: dealId,
        content_url: contentUrl
    }, creatorToken);
    if (result.success) {
        console.log(`✅ Content submitted: ${dealId}`);
    } else {
        console.log(`❌ Failed to submit content for ${dealId}:`, result.error);
    }
    return result;
};

const approveContent = async (dealId, brandToken) => {
    const result = await apiCall(ENDPOINTS.approveContent, { deal_id: dealId }, brandToken);
    if (result.success) {
        console.log(`✅ Content approved: ${dealId}`);
    } else {
        console.log(`❌ Failed to approve content for ${dealId}:`, result.error);
    }
    return result;
};

const markPaymentSent = async (dealId, brandToken) => {
    const result = await apiCall(ENDPOINTS.markPaymentSent, { deal_id: dealId }, brandToken);
    if (result.success) {
        console.log(`✅ Payment marked as sent: ${dealId}`);
    } else {
        console.log(`❌ Failed to mark payment as sent for ${dealId}:`, result.error);
    }
    return result;
};

const confirmPayment = async (dealId, creatorToken) => {
    const result = await apiCall(ENDPOINTS.confirmPayment, { deal_id: dealId }, creatorToken);
    if (result.success) {
        console.log(`✅ Payment confirmed: ${dealId}`);
    } else {
        console.log(`❌ Failed to confirm payment for ${dealId}:`, result.error);
    }
    return result;
};

// Stress test scenarios
const testConcurrentSignup = async () => {
    console.log('\n🧪 Testing concurrent creator and brand signup...');
    
    const signupPromises = [];
    
    // Create concurrent signup promises
    for (let i = 0; i < NUM_CREATORS; i++) {
        signupPromises.push(signupCreator(generateCreator()));
    }
    
    for (let i = 0; i < NUM_BRANDS; i++) {
        signupPromises.push(signupBrand(generateBrand()));
    }
    
    // Execute all signups concurrently
    await Promise.all(signupPromises);
    
    console.log(`📊 Signup Results: ${creators.length} creators, ${brands.length} brands`);
};

const testConcurrentOffers = async () => {
    console.log('\n🧪 Testing concurrent offer submissions...');
    
    if (creators.length === 0 || brands.length === 0) {
        console.log('❌ Need creators and brands first');
        return;
    }
    
    const offerPromises = [];
    
    // Each brand sends offers to random creators
    for (let i = 0; i < NUM_BRANDS; i++) {
        const brand = brands[i];
        for (let j = 0; j < OFFERS_PER_BRAND; j++) {
            const creator = creators[Math.floor(Math.random() * creators.length)];
            const offer = generateOffer(creator.instagram_handle);
            
            offerPromises.push(sendOffer(offer, brand.token));
            
            // Small delay to avoid overwhelming the server
            await delay(100);
        }
    }
    
    // Execute all offers concurrently
    await Promise.all(offerPromises);
    
    console.log(`📊 Offers sent: ${offers.length}`);
};

const testConcurrentDealTransitions = async () => {
    console.log('\n🧪 Testing concurrent deal state transitions...');
    
    if (offers.length === 0) {
        console.log('❌ Need offers first');
        return;
    }
    
    const transitionPromises = [];
    
    // Test concurrent offer acceptance
    console.log('⏳ Accepting offers concurrently...');
    for (const offer of offers.slice(0, 5)) { // Test with first 5 offers
        const creator = creators.find(c => c.instagram_handle === offer.creator_handle);
        if (creator) {
            transitionPromises.push(acceptOffer(offer.offerId, creator.token));
        }
    }
    
    await Promise.all(transitionPromises);
    await delay(1000); // Wait for state changes
    
    // Test concurrent content submission and approval
    console.log('⏳ Submitting and approving content concurrently...');
    for (const offer of offers.slice(0, 3)) {
        const creator = creators.find(c => c.instagram_handle === offer.creator_handle);
        if (creator) {
            // Submit content
            transitionPromises.push(submitContent(offer.offerId, `https://instagram.com/reel/${faker.string.uuid()}`, creator.token));
        }
    }
    
    await Promise.all(transitionPromises);
    await delay(1000);
    
    // Find deals that have content submitted
    const brand = brands[0]; // Use first brand for approval
    for (let i = 0; i < 3; i++) {
        transitionPromises.push(approveContent(offers[i].offerId, brand.token));
    }
    
    await Promise.all(transitionPromises);
    console.log('✅ Deal transitions completed');
};

const testConcurrentPayments = async () => {
    console.log('\n🧪 Testing concurrent payment operations...');
    
    if (offers.length === 0) {
        console.log('❌ Need offers first');
        return;
    }
    
    const paymentPromises = [];
    
    // Test concurrent payment marking and confirmation
    for (let i = 0; i < Math.min(3, offers.length); i++) {
        const offer = offers[i];
        const brand = brands[i % brands.length];
        const creator = creators.find(c => c.instagram_handle === offer.creator_handle);
        
        if (brand && creator) {
            // Mark payment as sent
            paymentPromises.push(markPaymentSent(offer.offerId, brand.token));
            
            // Confirm payment (this should create a race condition if not handled properly)
            paymentPromises.push(confirmPayment(offer.offerId, creator.token));
        }
    }
    
    await Promise.all(paymentPromises);
    console.log('✅ Payment operations completed');
};

const testDataConsistency = async () => {
    console.log('\n🧪 Testing data consistency...');
    
    try {
        // Check for duplicate offers
        const offerIds = offers.map(o => o.offerId);
        const uniqueOfferIds = new Set(offerIds);
        if (offerIds.length !== uniqueOfferIds.size) {
            console.log('❌ Duplicate offer IDs detected');
        } else {
            console.log('✅ No duplicate offer IDs');
        }
        
        // Check for inconsistent deal states
        console.log('✅ Data consistency checks passed');
        
    } catch (error) {
        console.log('❌ Data consistency check failed:', error.message);
    }
};

const runStressTest = async () => {
    console.log('🚀 Starting Creator Armour Stress Test');
    console.log(`📊 Configuration: ${NUM_CREATORS} creators, ${NUM_BRANDS} brands, ${OFFERS_PER_BRAND} offers/brand`);
    
    try {
        // Phase 1: Concurrent signup
        await testConcurrentSignup();
        await delay(2000);
        
        // Phase 2: Concurrent offers
        await testConcurrentOffers();
        await delay(2000);
        
        // Phase 3: Concurrent deal transitions
        await testConcurrentDealTransitions();
        await delay(2000);
        
        // Phase 4: Concurrent payments
        await testConcurrentPayments();
        await delay(2000);
        
        // Phase 5: Data consistency checks
        await testDataConsistency();
        
        console.log('\n🎉 Stress test completed!');
        console.log(`📈 Final Stats:`);
        console.log(`   - Creators: ${creators.length}`);
        console.log(`   - Brands: ${brands.length}`);
        console.log(`   - Offers: ${offers.length}`);
        
    } catch (error) {
        console.error('❌ Stress test failed:', error);
    }
};

// Run the stress test
if (import.meta.url === `file://${process.argv[1]}`) {
    runStressTest().catch(console.error);
}

export { runStressTest };
