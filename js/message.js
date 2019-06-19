! function () {
  var view = document.querySelector('section.message')
  var model = {
    init: function () {
      var APP_ID = '99lTYqFrhV5OSXX15ojX7gFw-gzGzoHsz'
      var APP_KEY = 'ntb34hO1h4FFmvdBMLg4LOdv'
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
    },
    //获取数据
    fetch: function(){
      var query = new AV.Query('Message');
      return query.find()//Promise 对象
    },
    //创建数据
    save: function(name,content){
      var Message = AV.Object.extend('Message')
      var message = new Message()
      return message.save({//Promise 对象
        'name': name,
        'content': content
      })
    }
  }
  var controller = {
    view: null,
    model:null,
    messageList: null,
    init: function (view) {
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    
    loadMessages: function () {
      this.model.fetch().then((messages) => {
        let array = messages.map((items) => items.attributes)
        array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          }),
          function (error) {
            alert('提交失败，请改天留言')
          }
      })
    },
    bindEvents: function () {   
      this.form.addEventListener('submit', (e)=>{
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name,content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log('存入成功')
        console.log(object)
      })
    }
  }
  controller.init(view)
}.call()


/**
//创建 TestObject 表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是 words:Hello Word!保存
//如果保存成功，则运行alert('')
testObject.save({
  words: 'Hello World!'
}).then(function (object) {
  alert('LeanCloud Rocks!');
})**/