class TestPool {
    constructor() {
        this.data = {rows: [{"project_id":1,"title":"Healthcare App","description":"App to stop obesity","members":["emily","charles"],"looking_for":"a computing student to code our app","paid":false,"duration":"12 weeks","tags":["java","obesity","healthcare"]},{"project_id":2,"title":"Local delivery app","description":"App where people can volunteer to deliver for local businesses","members":["mark","carolyn"],"looking_for":"a business student to help with viability and marketing of app","paid":true,"duration":"6 weeks","tags":["marketing","delivery","local business"]},{"project_id":3,"title":"Algorithmic Trading","description":"App which allows people with no coding knowledge to do algorithmic trading","members":["bob","eva"],"looking_for":"a finance or economics student knowledgable in trading strategies","paid":true,"duration":"8 weeks","tags":["algorithmic trading","stocks","finance"]}]};
    }
    query(text) {
        return this.data;
    }
}

module.exports = TestPool;