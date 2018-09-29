# offline-trial-activation-form

You can host this web page to allow your customers to offline activate the product trial.

You can easily update the theme of this web page as per your requirements.

## Adding Products

The webpage contains a `select` dropdown where you must add your products (choose any name) for which you want to allow trial activations along with their product ids'.

```html
...
<div class="form-group">
    <label for="product">Choose Product</label>
    <select id="product" class="form-control" name="product" required>
        <option value="PASTE_PRODUCT_ID" selected>Product1</option>
        <option value="PASTE_PRODUCT_ID">Product2</option>
    </select>
</div>
...
```
