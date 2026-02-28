using AutoMapper;
using LanchoneteRisa.Application.DTOs;
using LanchoneteRisa.Domain.Entities;

namespace LanchoneteRisa.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Tenant, TenantDto>();

        CreateMap<User, UserDto>();

        CreateMap<Category, CategoryDto>();

        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));

        CreateMap<Table, TableDto>();

        CreateMap<TableSession, TableSessionDto>()
            .ForMember(dest => dest.TableNumber, opt => opt.MapFrom(src => src.Table.Number));

        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.TableNumber, opt => opt.MapFrom(src => src.TableSession.Table.Number))
            .ForMember(dest => dest.WaiterName, opt => opt.MapFrom(src => src.Waiter != null ? src.Waiter.Name : null));

        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));

        CreateMap<Payment, PaymentDto>();

        CreateMap<Category, MenuCategoryDto>();
    }
}
