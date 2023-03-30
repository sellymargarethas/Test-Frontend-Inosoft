<template>
    <div class="B">
      <div class="container-fluid container-table">
        <div class="cost-detail">
          <h3>Cost Detail</h3>
          <i class="fas fa-angle-down fa-2x"></i>
        </div>
        <div class="row justify-content-center">
          <div class="col-auto">
            <table class="table table-sm content-table">
              <thead class="thead-light">
                <th width="12%" scope="col">Description</th>
                <th width="8%" scope="col">Qty</th>
                <th width="8%" scope="col">UOM</th>
                <th width="8%" scope="col">Unit Price</th>
                <th width="8%" scope="col">Discount(%)</th>
                <th width="8%" scope="col">VAT(%)</th>
                <th width="3%" scope="col"></th>
                <th width="8%" scope="col">Currency</th>
                <th width="8%" scope="col">VAT Amount</th>
                <th width="8%" scope="col">Sub Total</th>
                <th width="5%" scope="col">Total</th>
                <th scope="col">Charge To</th>
                <th width="3%" scope="col"></th>
              </thead>
              <tr v-for="(post, k) in posts" :key="k">
                <td>
                  <input class="form-control" type="text" id="description" name="description" v-model="post.description" />
                </td>
                <td>
                  <input class="form-control" type="number" id="qty" name="qty" v-model="post.qty" @change="calculateLineTotal(post)" />
                </td>
                <td>
                  <select class="form-control" id="uom" name="uom">
                    <option v-for="option in post.uom.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input class="form-control" type="number" id="unitPrice" name="unitPrice" v-model="post.unitPrice" @change="calculateLineTotal(post)" />
                </td>
                <td>
                  <input class="form-control" type="number" id="discount" name="discount" v-model="post.discount" @change="calculateLineTotal(post)" />
                </td>
                <td>
                  <input class="form-control" type="number" id="vat" name="vat" v-model="post.vat" @change="calculateLineTotal(post)" />
                </td>
                <td scope="row" class="align-middle iconContainer">
                  <i class="fas fa-arrow-right fa-2x"></i>
                </td>
                <td>
                  <select class="form-control" id="currency" name="currency">
                    <option v-for="option in post.currency.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                </td>
                <td class="align-middle text-center" id="vatAmount" name="vatAmount">
                  <!-- <input readonly class="form-control" type="text" v-model="post.vatAmount" /> -->
                  {{parseFloat(post.vatAmount).toFixed(2)}}
                </td>
                <td class="align-middle text-center" id="subTotal" name="subTotal">
                  {{parseFloat(post.subTotal).toFixed(2)}}
                </td>
                <td class="align-middle text-center" id="total" name="total">
                  {{parseFloat(post.total).toFixed(2)}}
                </td>
                <td>
                  <select class="form-control" id="chargeTo" name="chargeTo">
                    <option v-for="option in post.chargeTo.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                </td>
                <td scope="row" class="iconContainer">
                  <i class="fas fa-minus-square fa-3x" @click="deleteRow(k, post)" ></i>
                </td>
              </tr>
              <tr>
                <td colspan="7" rowspan="2" class="align-middle">Exchange Rate 1 USD=  3.675 AED</td>
                <td class="grey-col">AED in Total</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumVatAmount*3.675).toFixed(2)}}</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumSubTotal*3.675).toFixed(2)}}</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumTotal*3.675).toFixed(2)}}</td>
                <td rowspan="2"></td>
                <td rowspan="2" class="align-middle iconGreen">
                  <i class="fas fa-plus-square fa-3x" @click="addNewRow"></i>
                </td>
              </tr>
              <tr>
                <td class="grey-col ">USD in Total</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumVatAmount).toFixed(2)}}</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumSubTotal).toFixed(2)}}</td>
                <td class="grey-col text-center">{{parseFloat(inTotal.sumTotal).toFixed(2)}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
  
      <!-- <h1 v-for="(item, index) in posts" :key="index">{{ item.title }}</h1> -->
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "B",
    mounted(){
        //console.log(this.$parent.invoice_products);
        this.$store.dispatch('posts/loadPosts');
    },
    computed: {
        ...mapState('posts', ['posts'])
    },
    data() {
      return{
        inTotal: {
          sumVatAmount: 0,
          sumSubTotal: 0,
          sumTotal: 0
        }
      }
    },
    methods:{
      addNewRow(){
        this.posts.push({
          description: '',
          qty: '',
          uom: {
            option: [{name: 'ABCDE'}, {name: 'FGHIJ'}]
          },
          unitPrice: '',
          discount: 0,
          vat: 0,
          currency: {
            option: [{name: 'IDR'}, {name: 'USD'}]
          },
          vatAmount: 0,
          subTotal: 0,
          total: 0,
          chargeTo: {
            option: [{name: 'A'}, {name: 'B'}]
          }
        })
      },
      deleteRow(index, post){
        var idx = this.posts.indexOf(post);
        //console.log(idx, index);
        if(idx > -1) {
          this.posts.splice(idx, 1);
        }
        this.calculateTotal();
      },
      calculateLineTotal(post){
        var totalBasic = parseFloat(post.qty) * parseFloat(post.unitPrice);
        var totalDisc =  (totalBasic * post.discount)/100;
        var totalAfterdisc = totalBasic - totalDisc;
        var totalVat = (totalAfterdisc * post.vat)/100;
        var total = totalAfterdisc + totalVat;
        if(!isNaN(total)){
          post.vatAmount = totalVat.toFixed(2);
          post.subTotal = totalAfterdisc.toFixed(2);
          post.total = total.toFixed(2);
        }
        this.calculateTotal();
      },
      calculateTotal(){
        var sumTotal = this.posts.reduce(function(sum, product){
          var lineTotal = parseFloat(product.total);
          if(!isNaN(lineTotal)){
            return sum + lineTotal;
          }
        },0);
  
        var sumVatTotal = this.posts.reduce(function(sumVat, productVat){
          var lineVat = parseFloat(productVat.vatAmount);
          if(!isNaN(lineVat)){
            return sumVat + lineVat;
          }
        },0);
  
        var sumSubTotal = this.posts.reduce(function(sumSub, productSub){
          var lineSub = parseFloat(productSub.subTotal);
          if(!isNaN(lineSub)){
            return sumSub + lineSub;
          }
        },0);
  
        this.inTotal.sumTotal = sumTotal;
        this.inTotal.sumVatAmount = sumVatTotal;
        this.inTotal.sumSubTotal = sumSubTotal;
      }
    }
  };
  </script>
  
  <style lang="css" scoped>
      @import "../../css/app.css";
  </style>    