from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from base.models import Product, Wishlist
from base.serializers import WishlistSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishlist(request):
    user = request.user
    wishlist_items = Wishlist.objects.filter(user=user).order_by('-createdAt')
    serializer = WishlistSerializer(wishlist_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToWishlist(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    
    alreadyExists = Wishlist.objects.filter(user=user, product=product).exists()
    
    if alreadyExists:
        content = {'detail': 'Product already in wishlist'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    wishlist_item = Wishlist.objects.create(
        user=user,
        product=product
    )
    
    serializer = WishlistSerializer(wishlist_item, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFromWishlist(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    
    wishlist_item = get_object_or_404(Wishlist, user=user, product=product)
    wishlist_item.delete()
    
    return Response({'detail': 'Product removed from wishlist'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkWishlistStatus(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    
    isInWishlist = Wishlist.objects.filter(user=user, product=product).exists()
    
    return Response({'isInWishlist': isInWishlist})
