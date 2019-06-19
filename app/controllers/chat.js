module.exports.startChat = function(application, req, res){
    var formData = req.body;

    req.assert('nickname', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('nickname', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors();

    if(errors){
       res.render('index', {validacao: errors});
        return;
    }

   application.get('io').emit('msgToClient', {apelido: formData.nickname, mensagem: 'acabou de entrar'});

    res.render('chat', {formData: formData});
}