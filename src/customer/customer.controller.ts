import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // GET /customer
  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomer();
  }

  // GET /customer/:id
  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomerById(id);
  }

  // POST /customer
  @Post()
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.customerService.addCustomer(body);
  }
}
