from django.urls import path
from base.views import wishlist_views as views

urlpatterns = [
    path('', views.getWishlist, name='wishlist'),
    path('add/<str:pk>/', views.addToWishlist, name='wishlist-add'),
    path('remove/<str:pk>/', views.removeFromWishlist, name='wishlist-remove'),
    path('check/<str:pk>/', views.checkWishlistStatus, name='wishlist-check'),
]
