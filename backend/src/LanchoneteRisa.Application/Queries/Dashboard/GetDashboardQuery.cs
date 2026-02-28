using LanchoneteRisa.Application.DTOs;
using MediatR;

namespace LanchoneteRisa.Application.Queries.Dashboard;

public class GetDashboardQuery : IRequest<DashboardDto>
{
}
