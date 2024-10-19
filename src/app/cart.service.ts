import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];

  constructor(private http: HttpClient) {
    this.loadCart(); // Загружаємо кошик при ініціалізації сервісу
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveCart(); // Зберігаємо кошик в локальному сховищі
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  private loadCart() {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  }
}
