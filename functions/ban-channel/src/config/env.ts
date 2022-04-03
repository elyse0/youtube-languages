const frenchChannelBlacklistCollection = process.env.MONGO_FRENCH_CHANNEL_BLACKLIST_COLLECTION;
if (!frenchChannelBlacklistCollection) {
    throw Error('MONGO_FRENCH_CHANNEL_BLACKLIST_COLLECTION is not set');
}
const auth0Issuer = process.env.AUTH0_ISSUER;
if (!auth0Issuer) {
    throw Error('AUTH0_ISSUER is not set');
}
const auth0Audience = process.env.AUTH0_AUDIENCE;
if (!auth0Audience) {
    throw Error('AUTH0_AUDIENCE is not set');
}
const auth0jwksUri = process.env.AUTH0_JWKS_URI;
if (!auth0jwksUri) {
    throw Error('AUTH0_JWKS_URI is not set');
}

const config = {
    frenchChannelBlacklistCollection,
    auth0Issuer,
    auth0Audience,
    auth0jwksUri,
};

export default config;
