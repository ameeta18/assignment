package array;

import java.util.Scanner;

public class duplicate {

	public static void main(String[] args) 
	{
		Scanner num=new Scanner(System.in);
		int n=num.nextInt();
		int a[]=new int[n];
		for(int k=0;k<n;k++)
		{
			a[k]=num.nextInt();
		}
		for(int i=0;i<n;i++)
		{
			for(int j=i+1;j<n;j++)
			{
				if(a[i]==a[j]&&i!=j)
					System.out.println(a[j]);
			}
		}

	}

}
