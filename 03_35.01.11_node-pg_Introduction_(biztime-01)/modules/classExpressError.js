/** ExpressError extends the normal JS error so we can easily
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
  constructor(status, message=undefined) {
    super();
    this.status = status;
    this.message = message;
    console.error(this.stack);
  }
}

module.exports = ExpressError;