import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from "../products";
import { CommonModule } from '@angular/common'; // імпортуємо CommonModule
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor (
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get("productId");  // Отримуємо значення productId
      if (productId !== null) {  // Перевіряємо, чи не є productId null
        this.product = products[+productId];  // Якщо productId валідний, отримуємо продукт
      } else {
        console.error("Product ID is null");
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert("Your item has been added to the cart!");
  }
}
