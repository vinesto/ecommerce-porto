Vue.component('modal', {
    template:
        `
    <div>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p> 
                </header>
                <section class="modal-card-body">
                {{msg}}
                </section>
                <footer class="modal-card-foot">
                <button class="button is-success" @click="$emit('pay-item')">Pay Item</button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</div>
    `,

    data() {
        return {
            msg: 'Lorem lorem lorem'
        }
    }
});




var app = new Vue({
    el: "#app",
    data: {
        Jersey: [
            {
                id: 1,
                text: 'Home Jersey',
                description: 'Manchester United Home Jersey',
                img: '/images/mu-jersey-home.jpeg',
                priceTag: 'Rp. 120,000',
                price: 120000,
                quantity: 5

            },
            {
                id: 2,
                text: 'Away Jersey',
                description: 'Manchester United Away Jersey',
                img: '/images/mu-jersey-away.jpeg',
                priceTag: 'Rp. 120,000',
                price: 120000,
                quantity: 4
            },
            {
                id: 3,
                text: 'Third Jersey',
                description: 'Manchester United Third Jersey',
                img: '/images/mu-jersey-third.jpeg',
                priceTag: 'Rp. 150,000',
                price: 150000,
                quantity: 3
            },
            {
                id: 4,
                text: 'Training Jersey',
                description: 'Manchester United Training Jersey',
                img: '/images/mu-jersey-training.jpeg',
                priceTag: 'Rp. 180,000',
                price: 180000,
                quantity: 3
            },

        ],
        Item: {
            name: '',
            img: '',
            description: '',
            price: 0,
            quantity: 0
        },
        User: {
            name: '',
            email: '',
            password: ''
        },
        carts: [],
        isActive: false,
        totalPrice: 0,
        showModal: false
    },
    methods: {
        addItem: function (id) {
            this.Jersey.forEach(element => {
                if (element.id === id) {
                    if (element.quantity <= 0) {
                        element.quantity = 0
                        swal(element.text, "Insufficient Item", "error")
                    } else {
                        this.carts.push(element);
                        this.totalPrice += element.price;
                        element.quantity--;
                        swal(element.text, "You clicked the button!", "success")
                    }
                }
            });
        },
        priceTag: function (price) {
            return price.toLocaleString()
        },
        payItem: function () {
            this.carts = []
            this.totalPrice = 0
        },
        confirmPay: function () {
            this.carts = []
            this.isActive = false
        },
        clearItem: function (id) {
            // console.log('masuuuk',id);  
            this.carts.forEach((el, index) => {
                if (el.id === id) {
                    // console.log(index);
                    // console.log(el.indexOf(index));

                    // console.log(this.totalPrice);
                    // console.log(el.quantity);
                    this.carts.splice(index, 1)
                    el.quantity++
                    this.totalPrice -= el.price
                }
            });

            // for(let i = 0; i<this.carts.length; i++){
            //     this.carts[i].splice(i,1)
            // }
        },
        countItems: function () {
            return this.carts.length
        },
        deleteItemCart: function () {

        },

        registerUser: function () {
            // console.log('masuuk');
            
            axios.post('http://localhost:3000/users/register', {
                name: this.User.name,
                email: this.User.email,
                password: this.User.password,
            })
                .then(newUser => {
                    console.log(newUser);  
                    alert('Register Success')
                    window.location.replace('index.html')
                })
                .catch(function(err){
                    alert('Register Failed')
                    window.location.reload()
                })
        },
        loginUser: function () {
            axios.post('http://localhost:3000/users/login', {
                email: this.User.email,
                password: this.User.password
            })
                .then(user => {
                    console.log(user);

                    localStorage.setItem('token', user.data.token)
                    localStorage.setItem('name', user.data.name)
                    // alert(user.message)
                    alert('Login success')
                    window.location.replace('dashboard.html')
                })
                .catch(err => {
                    alert('Login failed')
                    window.location.replace('login.html')
                    console.log(err.message);
                })
        },



    }
})

// Vue. 