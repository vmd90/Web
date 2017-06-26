/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: (req, res) => {
        return res.view('pages/home/index');
    },

    about: (req, res) => {
        return res.view('pages/home/about');
    },

    wpp: (req, res) => {
        res.locals.layout = 'layouts/wpp';
        return res.view('wpp');
    }
};
