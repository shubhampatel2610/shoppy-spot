-- Reference schema for shoppy-spot's future real backend.
--
-- NOT wired up to the app yet - the app currently runs entirely on dummy data
-- (src/data/*.js) and dummyjson.com. This file exists so the target shape is
-- settled ahead of time, for when a real Postgres-backed API replaces the
-- dummy data layer. See the vendor experience plan for context.

-- ── Enums ─────────────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin');
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE order_payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE order_item_status AS ENUM ('pending', 'packed', 'shipped', 'delivered', 'cancelled');

-- ── Identity ──────────────────────────────────────────────────────────────

-- One row per account, regardless of role. Mirrors src/data/authData.js today.
CREATE TABLE profiles (
    id          UUID PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    role        user_role NOT NULL DEFAULT 'customer',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1:1 extension of profiles for vendor-only fields. Only exists for role = 'vendor'.
CREATE TABLE vendor_profiles (
    id                UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    store_name        TEXT NOT NULL,
    store_description TEXT,
    logo_url          TEXT,
    business_address  TEXT,
    phone             TEXT,
    -- Vendors are admin-provisioned (see plan) - no self-serve status field needed yet,
    -- but reserved here since an approval workflow is a likely future addition.
    is_active         BOOLEAN NOT NULL DEFAULT true,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Catalog ───────────────────────────────────────────────────────────────

CREATE TABLE categories (
    id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name  TEXT NOT NULL UNIQUE,
    slug  TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id            UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    category_id          UUID REFERENCES categories(id),
    title                TEXT NOT NULL,
    description          TEXT,
    sku                  TEXT,
    price                NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    discount_percentage  NUMERIC(5, 2) NOT NULL DEFAULT 0,
    stock_quantity       INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    brand                TEXT,
    images               JSONB NOT NULL DEFAULT '[]', -- array of image URLs
    status               product_status NOT NULL DEFAULT 'draft',
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_vendor_id ON products(vendor_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);

-- ── Orders ────────────────────────────────────────────────────────────────

-- One row per checkout. Can span multiple vendors - see order_items.
CREATE TABLE orders (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id      UUID NOT NULL REFERENCES profiles(id),
    shipping_address JSONB NOT NULL,
    payment_status   order_payment_status NOT NULL DEFAULT 'pending',
    order_status     order_status NOT NULL DEFAULT 'pending',
    subtotal         NUMERIC(10, 2) NOT NULL,
    total            NUMERIC(10, 2) NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- One row per product within an order. vendor_id is denormalized from products.vendor_id
-- so a vendor's order queries never need to join through products just to filter.
CREATE TABLE order_items (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id   UUID NOT NULL REFERENCES products(id),
    vendor_id    UUID NOT NULL REFERENCES vendor_profiles(id),
    quantity     INTEGER NOT NULL CHECK (quantity > 0),
    unit_price   NUMERIC(10, 2) NOT NULL,
    item_status  order_item_status NOT NULL DEFAULT 'pending',
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_vendor_id ON order_items(vendor_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ── Reviews ───────────────────────────────────────────────────────────────

-- Customer-authored, vendor read-only.
CREATE TABLE reviews (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES profiles(id),
    rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
