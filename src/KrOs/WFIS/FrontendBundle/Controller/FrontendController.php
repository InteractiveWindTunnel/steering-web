<?php

namespace KrOs\WFIS\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use KrOs\WFIS\FrontendBundle\Form\ArticleType;
use KrOs\WFIS\FrontendBundle\Entity\Article;

class FrontendController extends Controller
{
    /**
     * @Route("/skrzydlo/", name="wing")
     * @Method("GET")
     * @Secure(roles="ROLE_USER")
     */
    public function wingAction()
    {
        return $this->render('FrontendBundle::wing.html.twig');
    }

    /**
     * @Route("/EXP03/", name="third")
     * @Method("GET")
     */
    public function thirdAction(Request $r)
    {
        if ($r->get('view') === 'full') {
            return $this->render('FrontendBundle::third_f.html.twig');
        }
        return $this->render('FrontendBundle::third.html.twig');
    }

    /**
     * @Route("/silownia/", name="power")
     * @Method("GET")
     * @Secure(roles="ROLE_USER")
     */
    public function powerAction()
    {
        return $this->render('FrontendBundle::power.html.twig');
    }
    
    /**
     * @Route("/ita/", name="index_old")
     * @Method("GET")
     */
    public function powerOldAction()
    {
        return $this->redirect($this->get('router')->generate('index'));
    }
    
    /**
     * @Route("/menu/", name="menu")
     */
    public function menuAction()
    {
        $articles = $this->getDoctrine()->getManager()->getRepository('FrontendBundle:Article')->findAll();
        return $this->render('FrontendBundle::menu.html.twig', array('articles'=>$articles));
    }
    
    /**
    * @Route("/", name="about")
    * @Method("GET")
    */
    public function aboutAction()
    {
        return $this->render('FrontendBundle::about.html.twig');
    }
    
    /**
    * @Route("/article/add", name="addArticle")
    * @Method("GET")
    * @Secure("ROLE_ADMIN")
    */
    public function addNewArticleAction()
    {
        $article = new Article();
        $form = $this->createForm(new ArticleType(), $article);
        return $this->render('FrontendBundle::articleForm.html.twig', array('form'=>$form->createView()));
    }
    
    /**
    * @Route("/article/edit/{slug}", name="editArticle")
    * @Method("GET")
    * @Secure("ROLE_ADMIN")
    */
    public function editArticleAction($slug)
    {
        $article = $article = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('FrontendBundle:Article')
            ->findOneBySlug($slug);
        $form = $this->createForm(new ArticleType(), $article);
        return $this->render(
            'FrontendBundle::articleForm.html.twig',
            ['form'=>$form->createView(), 'article'=>$article]
        );
    }
    
    /**
    * @Route("/article/delete/{slug}", name="deleteArticle")
    * @Secure("ROLE_ADMIN")
    */
    public function deleteArticleAction($slug)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('FrontendBundle:Article')->findOneBySlug($slug);
        $em->remove($article);
        $em->flush();
        return $this->redirect($this->get('router')->generate('index'));
    }
    
    /**
    * @Route("/article/submit", name="submitArticle")
    * @Method({"GET", "POST"})
    * @Secure("ROLE_ADMIN")
    */
    public function submitFormAction(Request $request)
    {
        $article=new Article();
        $id = $request->get('aid');
      
        if ($id) {
            $article = $article = $this
                ->getDoctrine()
                ->getManager()
                ->getRepository('FrontendBundle:Article')
                ->findOneById($id);
        }
        $form = $this->createForm(new ArticleType(), $article);
        if ($request->getMethod() === 'POST') {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $this->get('doctrine.orm.entity_manager')->persist($article);
                $this->get('doctrine.orm.entity_manager')->flush();
                $this->get('session')->setFlash('notice', 'Pomyślnie dodano artykuł.');
                return $this->redirect($this->get('router')->generate('showArticle', array('slug'=>$article->getSlug())));
            }
            $this->get('session')->setFlash('warning', 'Wystąpiły błędy, popraw formularz i spróbuj ponownie.');
        }
        return $this->render('FrontendBundle::articleForm.html.twig', array('form' => $form->createView()));
    }
    
    
    /**
    * @Route("/article/{slug}", name="showArticle")
    */
    public function showArticleAction($slug)
    {
        $article = $this
            ->get('doctrine.orm.entity_manager')
            ->getRepository('FrontendBundle:Article')
            ->findOneBySlug($slug);

        return $this->render('FrontendBundle::showArticle.html.twig', array('article' => $article));
    }
}
