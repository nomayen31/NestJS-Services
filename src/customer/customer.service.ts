import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  // getAllCustomer: returns all customers
  getAllCustomer(): Customer[] {
    return this.customers;
  }

  // addCustomer: create a new customer using CreateCustomerDto
  addCustomer(data: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: Date.now(), // demo id — replace with DB id in production
      ...data,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  // (optional) helper: get by id
  getCustomerById(id: number): Customer {
    const c = this.customers.find(x => x.id === id);
    if (!c) throw new NotFoundException(`Customer with id ${id} not found`);
    return c;
  }
}
