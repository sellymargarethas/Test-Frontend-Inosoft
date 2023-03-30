<template>
    <div class="A">
      <div class="container-fluid container-table">
        <div class="row">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle logistic-btn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-truck"></i>Logistic Instruction
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">
                <i class="fas fa-truck"></i> Logistic Instruction</a
              >
            </div>
          </div>
          <div>
            <button class="btn btn-sm draft-btn" disabled>Draft</button>
          </div>
        </div>
        <div class="form-container" v-for="(form, k) in forms" :key="k">
            <div class="row justify-content-end first-row">
              <div class="col-2">
                  <p>Assigned Vendor</p>
                  <select class="form-control" id="assignedVendor" name="assignedVendor">
                    <option v-for="option in form.assignedVendor.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
              </div>
              <div class="col-2">
                  <p>Attention Of</p>
                  <input class="form-control" type="text" id="attentionOf" name="attentionOf" />
              </div>
              <div class="col-2">
                  <p>Quotation No.</p>
                  <input class="form-control" type="text" id="quotationNo" name="quatationNo" />
              </div>
              <div class="col-2">
                  <p>Invoice To</p>
                  <select class="form-control" id="invoiceTo" name="invoiceTo">
                    <option v-for="option in form.invoiceTo.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
              </div>
              <div class="col-2">
                  <p>Costumer - Contract</p>
                  <select class="form-control" id="costumerContract" name="costumerContract">
                    <option v-for="option in form.costumerContract.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
              </div>
            </div>
            <div class="row justify-content-end second-row">
              <div class="col-8">
                  <p>Vendor Address</p>
                  <input class="form-control" type="text" id="vendorAddress" name="vendorAddress" />
              </div>
              <div class="col-2">
                  <p>Costumer PO No.</p>
                  <select class="form-control" id="costumerPONo" name="costumerPONo">
                    <option v-for="option in form.costumerPONo.option" :key="option.name">
                      {{ option.name }}
                    </option>
                  </select>
              </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "A",
    mounted() {
      //console.log(this.$parent.invoice_products);
      this.$store.dispatch("posts/loadForms");
    },
    computed: {
      ...mapState("posts", ["forms"]),
    },
  };
  </script>
  
  <style lang="css" scoped>
  @import "../../css/app.css";
  </style>    