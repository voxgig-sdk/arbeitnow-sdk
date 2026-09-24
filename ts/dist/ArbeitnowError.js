"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbeitnowError = void 0;
class ArbeitnowError extends Error {
    isArbeitnowError = true;
    sdk = 'Arbeitnow';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ArbeitnowError = ArbeitnowError;
//# sourceMappingURL=ArbeitnowError.js.map