

var fs = require('fs');
var debug = require('debug');
var debuglog = debug('routes');
const { v4 : uuidv4 } = require('uuid');
const { fstat } = require('fs');

module.exports = function(app, modelPath, modelNames) {

  app.get('/', function(req, res){
		// check if the user's credentials are saved in a cookie //
    res.redirect('/home');
  });

  app.get('/login', function(req, res){
    res.redirect('/home');
  });

  app.post('/login', function(req, res){
    res.redirect('/home');
  });

  app.post('/', function(req, res){
    res.redirect('/home');
  });

  app.get('/home', function(req, res) {
    {
      debuglog('at home ' + JSON.stringify(req.session));
      res.render('home', {
        title : 'abot',
        conversationid : uuidv4().toString(),
      });
    }
  });

  app.get('/about', function(req, res) {
    res.render('about', {
      pagetitle : 'about',
      title : 'wosap about',
    });
  });

  app.get('/modeldata', function(req, res) {
    res.render('models', {
    });
  });

  modelNames.forEach( modelName => {
    app.get('/Xtable_' + modelName, function(req, res) {
      res.render('gen_table_' + modelName, {
        pagetitle : '' + modelName + ' table search',
        title : 'wosap ' + modelName + ' table search',
      });
    });
    app.get('/js/gen_' + modelName + '.lunr.json', function(req, res) {
      console.log('sending lunr ' + modelName);
      console.log(' looking for ' + (modelPath + '/gen_' + modelName + '.lunr.json.gz') );
      if ( fs.existsSync(modelPath + '/gen_' + modelName + '.lunr.json.gz')) {
        console.log('attempting to serve gz');
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "application/json");
        res.sendFile(  modelPath + '/gen_' + modelName + '.lunr.json.gz' ,{
          maxAge : 24*60*60*1000
        });
        return;
      }
      res.sendFile( modelPath + '/gen_' + modelName + '.lunr.json', {
        maxAge : 10823433
      });
    });

    //app.use("/", expressStaticGzip("/my/rootFolder/"));


    app.get('/model/' + modelName, function(req, res) {
      res.render('gen_model_' + modelName, {
        pagetitle : '' + modelName + ' model description',
        title : 'wosap ' + modelName + ' model description',
      });
    });
    app.get('/table_' + modelName, function(req, res) {
      res.render('gen_table_' + modelName, {
        pagetitle : '' + modelName + ' table search',
        title : 'wosap ' + modelName + ' table search',
      });
    });
    app.get('/domains/' + modelName, function(req, res) {
      res.render('gen_model_' + modelName, {
        pagetitle : 'domain ' + modelName,
        title : 'domain ' + modelName,
      });
    });
  });

  app.get('/table_fioribom', function(req, res) {
    res.render('table_fioribom', {
      pagetitle : 'Fiori BOM Table search',
      title : 'wosap Fiori BOM Table search',
    });
  });

  app.get('/table_iupacs', function(req, res) {
    res.render('table_iupacs', {
      pagetitle : 'table iupacs Table search',
      title : 'wosap iupacs Table search',
    });
  });

  app.get('/table_sobj_tables', function(req, res) {
    res.render('table_sobj_tables', {
      pagetitle : 'SOBJ Tables search',
      title : 'wosap SOBJ Tables search',
    });
  });


  app.get('/whatsnew', function(req, res) {
    res.render('whatsnew', {
      pagetitle : 'whatsnew',
      title : 'wosap: what\'s new'
    });
  });


  app.get('/termsofuse', function(req, res) {
    res.render('termsofuse', {
      pagetitle : 'Terms of use',
      title : 'wosap',
    });
  });

  app.get('/legal_en', function(req, res) {
    res.render('legal_en', {
      pagetitle : 'Legal Disclosure, Disclaimer and Privacy Statement',
      title : 'wosap'
    });
  });

  app.get('/legal_de', function(req, res) {
    res.render('legal_de', {
      pagetitle : 'Impressum, Haftungsausschluss und Datenschutzerkl&auml;rung',     
      title : 'abot',
    });
  });

// logged-in user homepage //


  app.get('/settings', function(req, res) {
    res.redirect('/');
  });

  app.post('/settings', function(req, res){
    res.redirect('/');
  });


  ['Cosmos','IUPAC','Philosophers_elements', 'SOBJ_Tables',  'Fiori_Backend_Catalogs', 'TWF_fields','TWF_countries',  'SAP_Transaction_codes', 'FioriBOM','GeneticDNA'].forEach(function(sPage) {
    app.get('/xdomains/' + sPage, function(req, res) {
      res.render('models/' + sPage, {
        pagetitle : 'domain ' + sPage,
        title : 'domain ' + sPage,
      });
    });
  });

  app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
