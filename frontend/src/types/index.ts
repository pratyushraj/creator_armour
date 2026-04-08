export interface User {
    id: string;
    email: string;
    name: string;
    role?: 'creator' | 'brand';
    created_at?: string;
}

export interface Creator {
    id: string;
    user_id: string;
    name: string;
    instagram_handle: string;
    bio?: string;
    city?: string;
    niche?: string;
    reel_price?: number;
    collab_link: string;
    audience_size?: number;
    engagement_rate?: number;
    profile_image?: string;
    created_at: string;
    updated_at: string;
}

export interface Package {
    id: string;
    creator_id: string;
    name: string;
    description: string;
    price: number;
    deliverables: string;
    created_at: string;
}

export interface Offer {
    id: string;
    deal_id: string;
    brand_name: string;
    brand_email: string;
    deliverables: string;
    amount: number;
    deadline?: string;
    notes?: string;
    status: 'pending' | 'accepted' | 'countered' | 'declined';
    created_at: string;
    updated_at: string;
}

export type DealStatus =
    | 'new_offer'
    | 'accepted'
    | 'address_pending'
    | 'content_creation'
    | 'content_submitted'
    | 'brand_review'
    | 'approved'
    | 'changes_requested'
    | 'payment_pending'
    | 'paid'
    | 'completed'
    | 'declined'
    | 'cancelled';

export interface Deal {
    id: string;
    creator_id: string;
    brand_name: string;
    brand_email: string;
    status: DealStatus;
    budget: number;
    deadline?: string;
    deliverables: string;
    content_url?: string;
    brand_feedback?: string;
    shipping_address?: string;
    created_at: string;
    updated_at: string;
}

export interface Payment {
    id: string;
    deal_id: string;
    amount: number;
    status: 'pending' | 'sent' | 'confirmed';
    confirmed_at?: string;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: 'offer' | 'deal' | 'payment' | 'system';
    read: boolean;
    deal_id?: string;
    created_at: string;
}

export interface Message {
    id: string;
    deal_id: string;
    sender_id: string;
    sender_type: 'creator' | 'brand';
    content: string;
    created_at: string;
}

export interface Review {
    id: string;
    deal_id: string;
    reviewer_id: string;
    reviewer_name: string;
    reviewer_type: 'creator' | 'brand';
    rating: number; // 1-5 stars
    comment?: string;
    created_at: string;
}

export interface Achievement {
    id: string;
    user_id: string;
    badge: 'first_offer' | 'first_deal' | 'five_deals' | 'ten_deals' | 'top_earner' | 'fast_responder' | 'verified';
    title: string;
    description: string;
    icon: string;
    earned_at: string;
}

export interface NotificationPreferences {
    user_id: string;
    email_new_offer: boolean;
    email_deal_update: boolean;
    email_payment: boolean;
    email_marketing: boolean;
    push_new_offer: boolean;
    push_deal_update: boolean;
    push_payment: boolean;
}
