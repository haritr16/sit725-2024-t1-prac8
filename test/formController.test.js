
const app = require('../server');
import('chai').then(chai => {
    const expect = chai.expect;

    describe('Form API', () => {

        describe('/POST ', () => {
        it('should submit form data and return success message', (done) => {
                chai.request(app)
                .post('/submit')
                .send({
                    name: 'hari',
                    email: 'hari@gmail.com',
                    car: 'car4'
                })
                .end((err, res) => {
                    if (err) {
                        console.error('Error submitting form:', err);
                        done(err); // Pass the error to Mocha's done callback
                        return;
                    }
                    expect(res).to.have.status(200);
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Form submitted successfully');
                    done();
                });
        });
    })
        
        describe('/GET ', () => {
        it('should get forms data', (done) => {
            chai.request(app)
                .get('/forms')
                .end((err, res) => {
                    //expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    //
    })
}).catch(error => {
    console.error('Error loading Chai:', error);
});



